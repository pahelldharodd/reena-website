"use client"

import { useEffect } from 'react'
import Hero from "@/components/hero"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import AppointmentForm from "@/components/appointment-form"

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <AppointmentForm />
      </main>
    </div>
  )
}

