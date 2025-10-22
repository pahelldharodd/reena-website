import { NextRequest, NextResponse } from 'next/server'
import { supabase, type Appointment, getAvailableTimeSlots, isValidBookingDate } from '@/lib/supabase'

// GET /api/appointments - Get appointments or available slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const action = searchParams.get('action') // 'availability' or 'all'

    if (action === 'availability' && date) {
      // Get available time slots for a specific date
      if (!isValidBookingDate(date)) {
        return NextResponse.json({ 
          availableSlots: [],
          message: 'Selected date is not available for booking' 
        })
      }

      // Get booked slots for the date
      const { data: bookedAppointments, error } = await supabase
        .from('appointments')
        .select('*')  // Get all fields for debugging
        .eq('date', date)
        .neq('status', 'cancelled')

      if (error) {
        console.error('Error fetching booked slots:', error)
        return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
      }

      console.log('Raw booked appointments data:', JSON.stringify(bookedAppointments, null, 2))
      
      // Normalize time format by removing seconds
      const bookedSlots = bookedAppointments.map(apt => {
        // Check if time format includes seconds and remove them
        const timeString = apt.time.includes(':00', 3) ? apt.time.substring(0, 5) : apt.time
        return timeString
      })
      
      console.log('Normalized booked slots:', bookedSlots)
      const availableSlots = getAvailableTimeSlots(date, bookedSlots)

      return NextResponse.json({ 
        date,
        availableSlots,
        bookedSlots,
        totalSlots: availableSlots.length + bookedSlots.length
      })
    }

    // Get all appointments (for admin purposes - you might want to add auth later)
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (error) {
      console.error('Error fetching appointments:', error)
      return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
    }

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error('Unexpected error in GET /api/appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const appointmentData: Omit<Appointment, 'id' | 'created_at'> = await request.json()

    // Validate required fields
    if (!appointmentData.name || !appointmentData.phone || !appointmentData.date || 
        !appointmentData.time || !appointmentData.service) {
      return NextResponse.json({ 
        error: 'Missing required fields: name, phone, date, time, and service are required' 
      }, { status: 400 })
    }

    // Validate date
    if (!isValidBookingDate(appointmentData.date)) {
      return NextResponse.json({ 
        error: 'Invalid booking date. Please select a valid future date.' 
      }, { status: 400 })
    }

    // Check if the time slot is still available
    const { data: existingAppointment, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('date', appointmentData.date)
      .eq('time', appointmentData.time)
      .neq('status', 'cancelled')
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking appointment availability:', checkError)
      return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
    }

    if (existingAppointment) {
      return NextResponse.json({ 
        error: 'This time slot is no longer available. Please select another time.' 
      }, { status: 409 })
    }

    // Create the appointment
    const { data: newAppointment, error: insertError } = await supabase
      .from('appointments')
      .insert([{
        ...appointmentData,
        status: 'pending'
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating appointment:', insertError)
      
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json({ 
          error: 'This time slot was just booked by someone else. Please select another time.' 
        }, { status: 409 })
      }
      
      return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
    }

    // TODO: Send confirmation emails here
    // You can integrate your email service here
    console.log('New appointment created:', newAppointment)

    return NextResponse.json({ 
      message: 'Appointment booked successfully!',
      appointment: newAppointment
    }, { status: 201 })

  } catch (error) {
    console.error('Unexpected error in POST /api/appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/appointments/:id - Update appointment (for future admin features)
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const pathParts = url.pathname.split('/')
    const appointmentId = pathParts[pathParts.length - 1]
    
    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 })
    }

    const updates = await request.json()

    const { data: updatedAppointment, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', appointmentId)
      .select()
      .single()

    if (error) {
      console.error('Error updating appointment:', error)
      return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    })
  } catch (error) {
    console.error('Unexpected error in PUT /api/appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}