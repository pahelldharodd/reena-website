"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from 'lucide-react'

export default function ParallaxSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D3436] via-[#2D3436]/95 to-[#2D3436]/90" />
        <Image
          src="/indian-pattern.svg"
          alt="Background pattern"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Floating Elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
        }}
      >
        <Image
          src="/placeholder.svg"
          alt="Floating design"
          fill
          className="object-contain filter brightness-0 invert opacity-50"
        />
      </div>

      <div 
        className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-20"
        style={{
          transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * -0.1}deg)`,
        }}
      >
        <Image
          src="/placeholder-designer.svg"
          alt="Floating design"
          fill
          className="object-contain filter brightness-0 invert opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Quote className="w-20 h-20 mx-auto mb-6 text-[#D4AF37]" />
          <blockquote className="text-3xl md:text-5xl font-serif leading-relaxed mb-6">
            "Fashion fades, but style is eternal. We create pieces that transcend trends and celebrate timeless elegance."
          </blockquote>
          <cite className="text-[#D4AF37] text-xl">- Rina Dharod</cite>
        </div>

        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our latest collection where traditional Indian craftsmanship meets contemporary design philosophy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/gallery">
              <Button 
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white transform hover:scale-105 transition-all duration-300"
              >
                View Latest Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#2D3436] transform hover:scale-105 transition-all duration-300"
            >
              Book Private Showing
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
          <span className="text-xs mt-2 opacity-70">Scroll</span>
        </div>
      </div>
    </section>
  )
}