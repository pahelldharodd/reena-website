"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Palette, Heart, Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const services = [
    {
      title: "Bridal Wear",
      description: "Created for brides across various castes and religions",
      icon: Heart,
      image: "/placeholder.svg",
      features: ["Multi-Cultural Designs", "Premium Fabrics", "Hand Embroidery", "Perfect Fit"],
      price: "Starting from ₹30,000"
    },
    {
      title: "Designer Blouses",
      description: "Our specialty - renowned for exquisite blouse designs ⭐",
      icon: Star,
      image: "/placeholder-designer.svg",
      features: ["Signature Designs", "Premium Quality", "Custom Fit", "Latest Trends"],
      price: "Starting from ₹5,000",
      isSpecialty: true
    },
    {
      title: "Bridesmaid Wear",
      description: "Created for people attending wedding functions",
      icon: Palette,
      image: "/indian-pattern.svg",
      features: ["Coordinated Looks", "Comfortable Designs", "Function-Appropriate", "Group Styling"],
      price: "Starting from ₹15,000"
    },
    {
      title: "Designer Indo-Western",
      description: "Contemporary fusion wear for modern occasions",
      icon: Scissors,
      image: "/placeholder.svg",
      features: ["Fusion Styles", "Modern Silhouettes", "Versatile Pieces", "Trend-Forward"],
      price: "Starting from ₹3000"
    },
    {
      title: "Image Consulting",
      description: "Professional styling and image transformation services",
      icon: Heart,
      image: "/placeholder-designer.svg",
      features: ["Personal Branding", "Color Analysis", "Body Type Styling", "Confidence Building"],
      price: "Starting from ₹10,000"
    },
    {
      title: "Wardrobe Makeovers",
      description: "Complete wardrobe transformation and organization",
      icon: Palette,
      image: "/indian-pattern.svg",
      features: ["Wardrobe Audit", "Style Planning", "Shopping Assistance", "Seasonal Updates"],
      price: "Starting from ₹30,000"
    },
    {
      title: "Working Woman Wear",
      description: "Professional yet stylish outfits for career women",
      icon: Star,
      image: "/placeholder.svg",
      features: ["Office Appropriate", "Comfort & Style", "Mix & Match", "Professional Look"],
      price: "Starting from ₹5,000"
    },
    {
      title: "Custom Stitching",
      description: "Expert tailoring and alterations for perfect fit",
      icon: Scissors,
      image: "/placeholder-designer.svg",
      features: ["Perfect Alterations", "Size Adjustments", "Style Modifications", "Quick Turnaround"],
      price: "Starting from ₹2,000"
    }
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-[#F5F7F9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-5">
        <Image
          src="/indian-pattern.svg"
          alt="Background pattern"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-0.5 bg-[#D4AF37]/20" />
          <h2 className="text-4xl md:text-5xl font-serif text-[#2D3436] mb-4 relative">
            Our <span className="text-[#D4AF37]">Services</span>
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl text-[#94A7B4] max-w-2xl mx-auto">
            From bespoke bridal wear to everyday elegance, we offer comprehensive fashion solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`border-[#94A7B4]/20 hover:border-[#D4AF37] transition-all duration-300 group hover:shadow-xl transform hover:-translate-y-2 overflow-hidden ${
                service.isSpecialty ? 'ring-2 ring-[#D4AF37] bg-gradient-to-br from-[#FDF7E7] to-white' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-[#2D3436] group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-sm text-[#94A7B4]">{service.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <div className={`transition-all duration-300 ${
                  hoveredIndex === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-[#94A7B4] flex items-center">
                        <div className="w-1 h-1 bg-[#D4AF37] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="pt-2 border-t border-[#94A7B4]/10">
                  <p className="text-sm font-semibold text-[#2D3436] mb-3">
                    {service.price}
                  </p>
                  {/* <Button 
                    size="sm" 
                    className="w-full bg-[#94A7B4] hover:bg-[#D4AF37] text-white transition-all duration-300 group-hover:bg-[#D4AF37]"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#94A7B4]/10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif text-[#2D3436] mb-4">
              Ready to Create Something Beautiful?
            </h3>
            <p className="text-lg text-[#94A7B4] mb-6">
              Book a consultation with our design team and let's bring your vision to life
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
              >
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

