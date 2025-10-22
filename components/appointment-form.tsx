"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, User, Mail, Phone, MessageCircle } from 'lucide-react'
import { isValidBookingDate, formatDateForDisplay, getTimeSlotsWith12HourFormat, formatTimeTo12Hour } from '@/lib/supabase'

const services = [
  'Bridal Wear',
  'Designer Blouses',
  'Bridesmaid Wear', 
  'Designer Indo-Western Collection',
  'Image Consulting',
  'Wardrobe Makeovers',
  'Working Woman Wear',
  'Custom Stitching'
]

export default function AppointmentForm() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    time: '',
    message: ''
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Fetch available time slots when date changes
  useEffect(() => {
    if (date) {
      fetchAvailableSlots()
    } else {
      setAvailableSlots([])
      setFormData(prev => ({ ...prev, time: '' }))
    }
  }, [date])

  const fetchAvailableSlots = async () => {
    if (!date) return
    
    setLoadingSlots(true)
    try {
      const dateString = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/appointments?action=availability&date=${dateString}`)
      const result = await response.json()
      
      if (response.ok) {
        console.log('API Response:', result)
        setAvailableSlots(result.availableSlots || [])
        setBookedSlots(result.bookedSlots || [])
      } else {
        console.error('Failed to fetch available slots:', result.error)
        setAvailableSlots([])
        setBookedSlots([])
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots([])
      setBookedSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !formData.time) {
      alert('Please select both date and time for your appointment.')
      return
    }

    setLoading(true)
    try {
      const appointmentData = {
        ...formData,
        date: format(date, 'yyyy-MM-dd')
      }

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        const selectedTimeFormatted = formatTimeTo12Hour(formData.time)
        alert(`Appointment booked successfully for ${format(date, 'MMMM d, yyyy')} at ${selectedTimeFormatted}! We will contact you soon to confirm.`)
        // Clear the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          time: '',
          message: ''
        })
        setDate(undefined)
        setSubmitted(true)
      } else {
        alert(result.error || 'Failed to book appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('An error occurred while booking the appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Get minimum date (today)
  const today = new Date()
  const minDate = new Date()
  minDate.setHours(0, 0, 0, 0)

  return (
    <section id="appointment" className="py-24 bg-[#FDF7E7]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] mb-4">Book an Appointment</h2>
            <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto mb-4" />
            <p className="text-[#94A7B4]">Schedule a consultation to discuss your fashion needs</p>
          </div>

          {/* Call Us Section */}
          <div className="bg-white rounded-lg p-6 mb-8 border border-[#94A7B4] shadow-sm">
            <div className="text-center">
              <h3 className="text-xl font-serif text-[#2D3436] mb-3">Prefer to Call?</h3>
              <p className="text-[#94A7B4] mb-4">Skip the form and speak directly with our team</p>
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#D4AF37]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href="tel:+919867068684" className="text-2xl font-bold text-[#D4AF37] hover:text-[#B8941F] transition-colors">
                  +91 98670 68684
                </a>
              </div>
              <p className="text-sm text-[#94A7B4] mt-2">Mon - Sun: 11 AM - 9 PM</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <div className="h-px bg-[#94A7B4] flex-1"></div>
              <span className="px-4 text-[#94A7B4] text-sm">OR</span>
              <div className="h-px bg-[#94A7B4] flex-1"></div>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-[#2D3436]">
                <User className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Full Name *
              </label>
              <Input 
                id="name" 
                name="name" 
                placeholder="Enter your full name"
                value={formData.name} 
                className="border-[#94A7B4] focus:border-[#D4AF37]" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-[#2D3436]">
                  <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Phone Number *
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="Enter your phone number"
                  type="tel" 
                  value={formData.phone} 
                  className="border-[#94A7B4] focus:border-[#D4AF37]" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-[#2D3436]">
                  <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Email Address
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  type="email" 
                  value={formData.email} 
                  className="border-[#94A7B4] focus:border-[#D4AF37]" 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-[#2D3436]">
                Service Type *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-[#94A7B4] rounded-md focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-[#2D3436]">
                  <CalendarIcon className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Preferred Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-[#94A7B4] focus:border-[#D4AF37]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => !isValidBookingDate(format(date, 'yyyy-MM-dd'))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time - Visual Selector */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-[#2D3436]">
                  <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Preferred Time *
                </label>
                
                {!date && (
                  <div className="text-center py-8 text-[#94A7B4] border-2 border-dashed border-[#E9ECEF] rounded-lg">
                    Please select a date first
                  </div>
                )}

                {date && loadingSlots && (
                  <div className="text-center py-8 text-[#94A7B4]">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#D4AF37]"></div>
                    <p className="mt-2">Loading available times...</p>
                  </div>
                )}

                {date && !loadingSlots && (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {getTimeSlotsWith12HourFormat().map(({ value, label }) => {
                        // Check for time with and without seconds
                        const isAvailable = availableSlots.includes(value)
                        const isBooked = bookedSlots.some(slot => 
                          slot === value || slot === `${value}:00`
                        )
                        const isSelected = formData.time === value

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => isAvailable ? setFormData(prev => ({ ...prev, time: value })) : null}
                            disabled={!isAvailable}
                            className={`
                              px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
                              ${isSelected 
                                ? 'bg-[#D4AF37] border-[#D4AF37] text-white shadow-lg transform scale-105' 
                                : isAvailable 
                                  ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:shadow-md cursor-pointer' 
                                  : 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-60'
                              }
                            `}
                          >
                            <div className="text-center">
                              <div className="font-semibold">{label}</div>
                              <div className={`text-xs ${isSelected ? 'text-white/80' : isAvailable ? 'text-green-600' : 'text-red-400'}`}>
                                {isAvailable ? 'Available' : 'Booked'}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
                        <span className="text-green-700">Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
                        <span className="text-red-600">Booked</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#D4AF37] rounded"></div>
                        <span className="text-[#D4AF37]">Selected</span>
                      </div>
                    </div>
                    
                    {/* Debug Info */}
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg overflow-auto max-h-32 text-xs">
                      <details>
                        <summary className="font-semibold text-gray-700 cursor-pointer">Debug Information</summary>
                        <div className="mt-2">
                          <p><strong>Booked Slots:</strong> {bookedSlots.join(', ') || 'None'}</p>
                          <p><strong>Available Slots:</strong> {availableSlots.join(', ') || 'None'}</p>
                          <p><strong>Selected Time:</strong> {formData.time || 'None'}</p>
                          <p><strong>2:00 PM Value:</strong> {getTimeSlotsWith12HourFormat().find(slot => slot.label === '2:00 PM')?.value || 'Not found'}</p>
                          <p><strong>Is 2:00 PM Booked:</strong> {
                            bookedSlots.some(slot => 
                              slot === '14:00' || slot === '14:00:00'
                            ) ? 'Yes' : 'No'
                          }</p>
                        </div>
                      </details>
                    </div>

                    {availableSlots.length === 0 && (
                      <div className="text-center py-6 text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        <p className="font-medium">No available slots for this date</p>
                        <p className="text-sm mt-1">Please select another date</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-[#2D3436]">
                <MessageCircle className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Additional Message
              </label>
              <Textarea 
                id="message"
                name="message"
                placeholder="Tell us about your style preferences, event details, or any specific requirements..."
                value={formData.message}
                className="border-[#94A7B4] focus:border-[#D4AF37]"
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white py-3 text-lg font-semibold"
              disabled={loading || availableSlots.length === 0}
            >
              {loading ? 'Booking Appointment...' : 'Book Appointment'} 
            </Button>
          </form>

          {loading && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div> 
            </div>
          )}

          {submitted && (
            <div className="mt-4 text-center text-green-600">
              You'll receive booking confirmation soon.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

