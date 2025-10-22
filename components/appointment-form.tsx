"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

export default function AppointmentForm() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    requirements: '',
    recipientEmail: '' // Add recipient email field
  })
  const [loading, setLoading] = useState(false) // Add loading state
  const [submitted, setSubmitted] = useState(false) // Add submitted state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when form submission starts
    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, date })
      })
      const result = await response.json()
      if (response.ok) {
        alert('Appointment request sent successfully')
        // Clear the form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          requirements: '',
          recipientEmail: ''
        })
        setDate(undefined)
        setSubmitted(true) // Set submitted to true after successful submission
      } else {
        alert(`Failed to send appointment request: ${result.message}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred while submitting the form. Please try again.')
    } finally {
      setLoading(false) // Set loading to false when form submission ends
    }
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} className="border-[#94A7B4] focus:border-[#D4AF37]" onChange={handleChange} />
              <Input id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} className="border-[#94A7B4] focus:border-[#D4AF37]" onChange={handleChange} />
            </div>
            <Input id="phone" name="phone" placeholder="Phone" type="tel" value={formData.phone} className="border-[#94A7B4] focus:border-[#D4AF37]" onChange={handleChange} />
            <Input id="recipientEmail" name="recipientEmail" placeholder="Recipient Email" type="email" value={formData.recipientEmail} className="border-[#94A7B4] focus:border-[#D4AF37]" onChange={handleChange} />
            
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
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Textarea 
              id="requirements"
              name="requirements"
              placeholder="Tell us about your requirements"
              value={formData.requirements}
              className="border-[#94A7B4] focus:border-[#D4AF37]"
              onChange={handleChange}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-[#94A7B4] hover:bg-[#7A8A95] text-white"
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Submitting...' : 'Request Appointment'} 
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

