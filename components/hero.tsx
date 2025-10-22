"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Array of featured collection images - you can replace these with actual images
  const featuredImages = [
    { src: "/hero_imgs/featured1.jpg", alt: "Featured Design 1" },
    { src: "/hero_imgs/featured2.jpg", alt: "Featured Design 2" },
    { src: "/hero_imgs/featured3.jpg", alt: "Featured Design 3" },
    { src: "/hero_imgs/featured4.jpg", alt: "Featured Design 4" },
    { src: "/hero_imgs/featured5.jpg", alt: "Featured Design 5" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredImages.length])

  return (
    <section className="pt-2 relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-60"
        style={{
          transform: 'rotate(-4deg) scale(1.2)'
        }}
      />
      
      {/* Floating Pattern Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
        <Image
          src="/indian-pattern.svg"
          alt="Decorative pattern"
          fill
          className="object-contain animate-pulse"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 animate-bounce">
        <Image
          src="/indian-pattern.svg"
          alt="Decorative pattern"
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 space-y-8">
            <div className="inline-block">
              <div className="relative">
                <div className="h-0.5 w-32 bg-[#D4AF37]" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-[#D4AF37] transform rotate-45" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-[#2D3436] leading-tight">
              Where Tradition Meets 
              <span className="block text-[#D4AF37]">Contemporary Elegance</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#94A7B4] leading-relaxed max-w-lg">
              Crafting bespoke Indo-western ensembles that celebrate the modern Indian woman with timeless sophistication
            </p>
            
            {/* Buttons and Stats Container */}
            <div className="flex flex-col gap-8">
              {/* Buttons Container */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-[#94A7B4] hover:bg-[#7A8A95] text-white border border-[#94A7B4] hover:border-[#7A8A95] transform hover:scale-105 transition-all duration-300"
                >
                  Book a Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transform hover:scale-105 transition-all duration-300"
                >
                  Explore Collections
                </Button>
              </div>

              {/* Social Proof - Centered relative to buttons above */}
              <div className="flex justify-start">
                <div className="w-full max-w-[400px] flex justify-center">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2D3436]">5000+</div>
                      <div className="text-sm text-[#94A7B4]">Happy Clients</div>
                    </div>
                    <div className="w-px h-12 bg-[#D4AF37]" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2D3436]">15+</div>
                      <div className="text-sm text-[#94A7B4]">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Featured Images Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-0 border-4 border-[#D4AF37] transform translate-x-4 translate-y-4 rounded-2xl" />
              <div className="relative z-10 h-full rounded-2xl overflow-hidden bg-white shadow-2xl">
                {featuredImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Image Indicators */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-[#D4AF37] scale-125' 
                        : 'bg-gray-300 hover:bg-[#D4AF37]/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4AF37]/10 rounded-full animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#94A7B4]/10 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  )
}

