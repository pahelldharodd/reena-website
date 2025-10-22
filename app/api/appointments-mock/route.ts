import { NextRequest, NextResponse } from 'next/server'

// Temporary mock data for testing (replace with Supabase when ready)
const mockBookedSlots: { [key: string]: string[] } = {
  '2025-10-22': ['10:00', '14:00', '16:00'],
  '2025-10-23': ['09:00', '11:30', '15:00'],
  '2025-10-24': ['12:00', '17:00'],
}

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00'
]

// GET /api/appointments-mock - Mock version for testing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const action = searchParams.get('action')

    if (action === 'availability' && date) {
      // Get booked slots for the date (mock data)
      const bookedSlots = mockBookedSlots[date] || []
      
      // Filter available slots
      const today = new Date()
      const selectedDate = new Date(date)
      const isToday = selectedDate.toDateString() === today.toDateString()
      
      let availableSlots = availableTimeSlots.filter(slot => !bookedSlots.includes(slot))
      
      // If it's today, only show future time slots
      if (isToday) {
        const currentHour = today.getHours()
        const currentMinute = today.getMinutes()
        
        availableSlots = availableSlots.filter(timeSlot => {
          const [hours, minutes] = timeSlot.split(':').map(Number)
          const slotTimeInMinutes = hours * 60 + minutes
          const currentTimeInMinutes = currentHour * 60 + currentMinute + 60 // Add 1 hour buffer
          
          return slotTimeInMinutes > currentTimeInMinutes
        })
      }

      return NextResponse.json({ 
        date,
        availableSlots,
        bookedSlots,
        totalSlots: availableSlots.length + bookedSlots.length,
        message: 'Using mock data - connect Supabase for real functionality'
      })
    }

    return NextResponse.json({ appointments: [], message: 'Mock API - no appointments stored' })
  } catch (error) {
    console.error('Error in mock API:', error)
    return NextResponse.json({ error: 'Mock API error' }, { status: 500 })
  }
}

// POST /api/appointments-mock - Mock booking
export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()
    
    // Mock successful booking
    console.log('Mock appointment booked:', appointmentData)
    
    // Add to mock booked slots
    const date = appointmentData.date
    if (!mockBookedSlots[date]) {
      mockBookedSlots[date] = []
    }
    mockBookedSlots[date].push(appointmentData.time)
    
    return NextResponse.json({ 
      message: 'Mock appointment booked successfully! (Connect Supabase for real booking)',
      appointment: {
        id: `mock-${Date.now()}`,
        ...appointmentData,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error in mock booking:', error)
    return NextResponse.json({ error: 'Mock booking failed' }, { status: 500 })
  }
}