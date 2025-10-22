"use client"

import { SiInstagram, SiWhatsapp, SiGooglemaps } from 'react-icons/si'
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { isValidPhoneNumber } from '@/lib/supabase'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      setSubscribeStatus("error")
      return
    }
    
    try {
      setSubscribeStatus("loading")
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubscribeStatus("success")
        setPhoneNumber('')
        // Reset status after 3 seconds
        setTimeout(() => setSubscribeStatus("idle"), 3000)
      } else {
        throw new Error(data.message || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      setSubscribeStatus("error")
      // Reset status after 3 seconds
      setTimeout(() => setSubscribeStatus("idle"), 3000)
    }
  }

  return (
    <footer className="bg-[#2D3436] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/indian-pattern.svg"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 relative">
                <Image
                  src="/reena logo.png"
                  alt="Rina Dharod Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#D4AF37]">Rina Dharod</h3>
            </div>
            <p className="text-[#94A7B4] leading-relaxed mb-6">
              Creating timeless Indo-western fashion that celebrates tradition while embracing modernity.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#94A7B4]">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Crafted with love since 2010</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-[#D4AF37]">Quick Links</h3>
            <div className="space-y-3">
              {[
                { href: "#services", label: "Our Services" },
                { href: "#about", label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/gallery", label: "Collections" },
                { href: "#", label: "Testimonials" },
                { href: "#", label: "Contact" }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="block text-[#94A7B4] hover:text-[#D4AF37] transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-[#D4AF37]">Our Services</h3>
            <div className="space-y-3">
              {[
                "Bridal Wear",
                "Designer Collections", 
                "Custom Tailoring",
                "Styling Consultation",
                "Alterations",
                "Personal Shopping"
              ].map((service, index) => (
                <div key={index} className="text-[#94A7B4] flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-[#D4AF37]">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#94A7B4] text-sm">Email us at</p>
                  <a href="mailto:contact@rinadharod.com" className="text-white hover:text-[#D4AF37] transition-colors">
                    contact@rinadharod.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#94A7B4] text-sm">Call us at</p>
                  <a href="tel:+919867068684" className="text-white hover:text-[#D4AF37] transition-colors">
                    +91 98670 68684
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#94A7B4] text-sm">Visit our store</p>
                  <p className="text-white text-sm leading-relaxed">
                    Shop no 8, Parwana App<br />
                    Near Saibaba Nagar, Opp. Axis Bank<br />
                    Ram Nagar, Borivali West<br />
                    Mumbai, Maharashtra 400092
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-[#94A7B4] text-sm mb-3">Follow our journey</p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.instagram.com/rinadharod_fashionlabel/", icon: SiInstagram, label: "Instagram" },
                  { href: "http://Wa.me/+919867068684", icon: SiWhatsapp, label: "WhatsApp" },
                  { href: "https://maps.app.goo.gl/gMvqycHNuSF8QwU49?g_st=com.google.maps.preview.copy", icon: SiGooglemaps, label: "Location" }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-[#94A7B4]/20 rounded-full flex items-center justify-center text-[#94A7B4] hover:text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300 transform hover:scale-110" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[#94A7B4]/20 pt-8 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="font-serif text-xl text-[#D4AF37] mb-3">Stay Updated</h4>
            <p className="text-[#94A7B4] mb-6">
              Subscribe to our newsletter for the latest collections, styling tips, and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="tel" 
                placeholder="Enter your phone number"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-[#94A7B4]/30 text-white placeholder-[#94A7B4] focus:outline-none focus:border-[#D4AF37]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <Button 
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white px-6"
                disabled={subscribeStatus === "loading"}
              >
                {subscribeStatus === "loading" ? "Subscribing..." : 
                 subscribeStatus === "success" ? "Subscribed!" : 
                 subscribeStatus === "error" ? "Try Again" : "Subscribe"}
              </Button>
            </form>
            {subscribeStatus === "success" && (
              <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#94A7B4]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94A7B4] text-sm">
            &copy; {new Date().getFullYear()} Rina Dharod. All rights reserved. | Designed with love for fashion
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-[#94A7B4] hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#94A7B4] hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-[#94A7B4] hover:text-[#D4AF37] transition-colors">
              Size Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-full shadow-lg z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  )
}

