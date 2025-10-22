import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Appointment {
  id?: string
  name: string
  email?: string
  phone: string
  date: string
  time: string
  service: string
  message?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
}

// Available time slots for appointments (24-hour format for backend)
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00'
]

// Convert 24-hour time to 12-hour AM/PM format
export function formatTimeTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

// Convert 12-hour time to 24-hour format
export function formatTimeTo24Hour(time12: string): string {
  const [time, period] = time12.split(' ')
  const [hours, minutes] = time.split(':').map(Number)
  
  let hours24 = hours
  if (period === 'AM' && hours === 12) {
    hours24 = 0
  } else if (period === 'PM' && hours !== 12) {
    hours24 = hours + 12
  }
  
  return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

// Get time slots with 12-hour format
export function getTimeSlotsWith12HourFormat(): Array<{value: string, label: string}> {
  return TIME_SLOTS.map(time => ({
    value: time,
    label: formatTimeTo12Hour(time)
  }))
}

// Business hours configuration
export const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 18,  // 6 PM
  lunchStart: 12, // 12 PM
  lunchEnd: 14,   // 2 PM
  closedDays: [0] // Sunday (0 = Sunday, 1 = Monday, etc.)
}

// Get available time slots for a specific date
export function getAvailableTimeSlots(selectedDate: string, bookedSlots: string[] = []): string[] {
  const now = new Date()
  const selected = new Date(selectedDate)
  const isToday = selected.toDateString() === now.toDateString()
  
  // Check if it's a closed day
  if (BUSINESS_HOURS.closedDays.includes(selected.getDay())) {
    return []
  }
  
  return TIME_SLOTS.filter(timeSlot => {
    // Remove already booked slots
    if (bookedSlots.includes(timeSlot)) {
      return false
    }
    
    // If it's today, only show future time slots
    if (isToday) {
      const [hours, minutes] = timeSlot.split(':').map(Number)
      const slotTime = new Date()
      slotTime.setHours(hours, minutes, 0, 0)
      
      // Add 1 hour buffer for booking
      const minBookingTime = new Date(now.getTime() + 60 * 60 * 1000)
      
      return slotTime > minBookingTime
    }
    
    return true
  })
}

// Format date for display
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Validate if a date is bookable
export function isValidBookingDate(dateString: string): boolean {
  const selected = new Date(dateString)
  const today = new Date()
  
  // Remove time component for comparison
  today.setHours(0, 0, 0, 0)
  selected.setHours(0, 0, 0, 0)
  
  // Must be today or future
  if (selected < today) {
    return false
  }
  
  // Check if it's a closed day
  if (BUSINESS_HOURS.closedDays.includes(selected.getDay())) {
    return false
  }
  
  // Don't allow booking more than 3 months in advance
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  
  return selected <= maxDate
}