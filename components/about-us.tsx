"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Users, Calendar, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  
  const stats = [
    { icon: Calendar, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Heart, value: "1000+", label: "Designs Created" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#FDF7E7]/30">
      <div 
        className="absolute inset-0 bg-[url('/indian-pattern.svg')] opacity-5 bg-repeat"
        style={{ backgroundSize: '120px 120px' }}
      />
      
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            {/* Image with decorative elements */}
            <div className="absolute inset-0 border-4 border-[#D4AF37] transform translate-x-6 translate-y-6 rounded-2xl" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder-designer.svg"
                alt="Designer at work"
                width={600}
                height={400}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4AF37]/20 rounded-full animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#94A7B4]/20 rounded-full animate-bounce" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] mb-4">
                About <span className="text-[#D4AF37]">Rina Dharod</span>
              </h2>
              <div className="h-0.5 w-20 bg-[#D4AF37] mb-6" />
            </div>
            
            <p className="text-[#94A7B4] leading-relaxed text-lg">
              With over a decade of experience in fashion design, Rina Dharod has established herself as a prominent name in Indo-western fashion. Her unique approach combines traditional Indian craftsmanship with contemporary silhouettes.
            </p>
            
            <p className="text-[#94A7B4] leading-relaxed">
              Each creation is a testament to her commitment to quality, attention to detail, and understanding of what makes a woman feel confident and beautiful. From bridal wear to ready-to-wear collections, every piece tells a story of elegance and sophistication.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-4 bg-white/50 rounded-r-lg">
              <p className="text-[#2D3436] italic mb-2">
                "Fashion is not just about clothing; it's about empowering women to express their unique identity while honoring their heritage."
              </p>
              <cite className="text-[#94A7B4] text-sm">- Rina Dharod</cite>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white transform hover:scale-105 transition-all duration-300"
              >
                Our Story
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#94A7B4] text-[#94A7B4] hover:bg-[#94A7B4]/10 transform hover:scale-105 transition-all duration-300"
              >
                Meet the Team
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#94A7B4]/10">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-3xl font-bold text-[#2D3436] mb-2">{stat.value}</div>
                <div className="text-sm text-[#94A7B4]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}

