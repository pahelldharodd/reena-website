"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToAppointment = () => {
    if (pathname === '/') {
      const appointmentSection = document.getElementById('appointment')
      appointmentSection?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close menu after clicking
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#94A7B4]/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/reena-logo.png"
              alt="Rina Dharod Logo"
              width={240}
              height={80}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain w-32 h-16 md:w-60 md:h-20"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-[#2D3436] hover:text-[#94A7B4] transition-colors text-sm uppercase tracking-wider"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-[#2D3436] hover:text-[#94A7B4] transition-colors text-sm uppercase tracking-wider"
            >
              About Us
            </Link>
            {pathname === '/' ? (
              <Button 
                variant="outline" 
                className="border-[#94A7B4] text-[#2D3436] hover:bg-[#94A7B4]/10"
                onClick={scrollToAppointment}
              >
                Book Appointment
              </Button>
            ) : (
              <Link href="/#appointment">
                <Button 
                  variant="outline" 
                  className="border-[#94A7B4] text-[#2D3436] hover:bg-[#94A7B4]/10"
                >
                  Book Appointment
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 text-[#2D3436] hover:text-[#94A7B4] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-[#94A7B4]/20 shadow-lg">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <Link 
                href="/" 
                className="text-[#2D3436] hover:text-[#94A7B4] transition-colors text-sm uppercase tracking-wider"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-[#2D3436] hover:text-[#94A7B4] transition-colors text-sm uppercase tracking-wider"
                onClick={closeMenu}
              >
                About Us
              </Link>
              {pathname === '/' ? (
                <Button 
                  variant="outline" 
                  className="border-[#94A7B4] text-[#2D3436] hover:bg-[#94A7B4]/10 w-full"
                  onClick={scrollToAppointment}
                >
                  Book Appointment
                </Button>
              ) : (
                <Link href="/#appointment" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    className="border-[#94A7B4] text-[#2D3436] hover:bg-[#94A7B4]/10 w-full"
                  >
                    Book Appointment
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}