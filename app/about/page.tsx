"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Leaf, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState(0)

  // const achievements = [
  //   { icon: Award, title: "Fashion Excellence Award", year: "2023" },
  //   { icon: Heart, title: "Designer of the Year", year: "2022" },
  //   { icon: Users, title: "Customer Choice Award", year: "2021" },
  //   { icon: Leaf, title: "Sustainable Fashion Leader", year: "2020" },
  // ]

  const timelineEvents = [
    { year: "2010", event: "Founded Rina Dharod Label", description: "Started the journey with a vision to blend tradition with modernity" },
    { year: "2015", event: "First Fashion Week Debut", description: "Showcased at Lakmé Fashion Week, gaining national recognition" },
    { year: "2018", event: "International Expansion", description: "Opened boutiques in Dubai and London" },
    { year: "2023", event: "Sustainable Collection Launch", description: "Introduced eco-friendly fashion line with zero-waste production" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-12 relative overflow-hidden bg-gradient-to-br from-[#FDF7E7] to-white">
        <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
          <Image
            src="/indian-pattern.svg"
            alt="Decorative pattern"
            fill
            className="object-contain animate-pulse"
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif text-[#2D3436] mb-6 leading-tight">
              The Story Behind <span className="text-[#D4AF37]">Rina Dharod</span>
            </h1>
            <p className="text-xl text-[#94A7B4] mb-8 leading-relaxed">
              A journey of passion, craftsmanship, and dedication to creating timeless fashion
            </p>
            <div className="h-0.5 w-32 bg-[#D4AF37] mx-auto" />
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <div className="absolute inset-0 border-4 border-[#D4AF37] transform translate-x-6 translate-y-6 rounded-3xl" />
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/about2.jpg"
                  alt="Rina Dharod"
                  width={1000}
                  height={1000}
                  className="object-cover w-full h-100"
                />
              </div>

              {/* Floating achievements */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-[#94A7B4]/10">
                {/* <div className="text-2xl font-bold text-[#D4AF37]">15+</div> */}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] leading-tight">
                Where Vision Meets <span className="text-[#D4AF37]">Craftsmanship</span>
              </h2>
              
              <div className="space-y-4 text-[#94A7B4] leading-relaxed">
                <p>
                  Rina Dharod's journey began with a simple belief: that fashion should celebrate both tradition and innovation. Born and raised in Mumbai, Rina was surrounded by the rich textile heritage of India, which sparked her passion for design at an early age.
                </p>
                <p>
                  After graduating from the National Institute of Fashion Technology, she worked with renowned designers before launching her eponymous label in 2010. Her vision was clear – to create Indo-western ensembles that would make every woman feel confident, beautiful, and connected to her heritage.
                </p>
                <p>
                  Today, Rina Dharod is recognized as a leader in sustainable fashion, working with skilled artisans to preserve traditional crafts while creating contemporary masterpieces.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                >
                  Our Collections
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[#94A7B4] text-[#94A7B4] hover:bg-[#94A7B4]/10"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline
          <div className="mb-20">
            <h3 className="text-3xl font-serif text-[#2D3436] text-center mb-12">
              Our <span className="text-[#D4AF37]">Journey</span>
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#D4AF37]/30"></div>
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <Card className="border-[#94A7B4]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-[#D4AF37] mb-2">{event.year}</div>
                        <h4 className="text-lg font-semibold text-[#2D3436] mb-2">{event.event}</h4>
                        <p className="text-[#94A7B4] text-sm">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block w-2/12 text-center">
                    <div className="w-4 h-4 bg-[#D4AF37] rounded-full mx-auto border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Achievements */}
          {/* <div className="grid md:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center border-[#94A7B4]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-semibold text-[#2D3436] mb-2">{achievement.title}</h4>
                  <p className="text-[#D4AF37] font-bold">{achievement.year}</p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      {/* Our Karigars Section */}
      <section className="py-20 bg-[#FDF7E7]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] mb-4">
              Our <span className="text-[#D4AF37]">Skilled Artisans</span>
            </h2>
            <p className="text-lg text-[#94A7B4] max-w-2xl mx-auto">
              The heart of our creations lies in the skilled hands of our master craftsmen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { src: "/placeholder.svg", alt: "Embroidery work", title: "Hand Embroidery Masters" },
              { src: "/placeholder-designer.svg", alt: "Garment construction", title: "Pattern & Construction Experts" },
              { src: "/indian-pattern.svg", alt: "Beadwork", title: "Beadwork & Embellishment Artists" }
            ].map((karigar, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={karigar.src}
                    alt={karigar.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">{karigar.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6 text-[#94A7B4] leading-relaxed">
            <p>
              At the core of every Rina Dharod creation are our skilled artisans, known as Karigars. These master craftsmen and women carry forward generations of expertise in embroidery, beadwork, and textile manipulation.
            </p>
            <p>
              We take immense pride in our partnership with these artisans, providing fair wages, safe working conditions, and opportunities for skill development. This ensures that traditional crafts continue to thrive while our artisans secure better futures for themselves and their families.
            </p>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#FDF7E7] rounded-3xl p-8 md:p-12 shadow-lg border border-[#94A7B4]/10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif text-[#2D3436] mb-4">
                Our <span className="text-[#D4AF37]">Design Process</span>
              </h3>
              <p className="text-lg text-[#94A7B4] max-w-2xl mx-auto">
                From concept to creation, every piece goes through our meticulous design process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "Understanding your vision, style preferences, and requirements",
                  image: "/placeholder.svg"
                },
                {
                  step: "02", 
                  title: "Design & Sketch",
                  description: "Creating custom designs and detailed sketches for your approval",
                  image: "/placeholder-designer.svg"
                },
                {
                  step: "03",
                  title: "Craft & Deliver",
                  description: "Expert craftsmanship by skilled artisans with final fitting",
                  image: "/indian-pattern.svg"
                }
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={process.image}
                        alt={process.title}
                        width={96}
                        height={96}
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h4 className="text-xl font-serif text-[#2D3436] mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {process.title}
                  </h4>
                  <p className="text-[#94A7B4] text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Sustainability Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] leading-tight">
                Our Commitment to <span className="text-[#D4AF37]">Sustainability</span>
              </h2>
              
              <div className="space-y-4 text-[#94A7B4] leading-relaxed">
                <p>
                  At Rina Dharod, we believe that fashion should not come at the cost of our planet. We are deeply committed to sustainable practices throughout our design and production processes.
                </p>
                <p>
                  From sourcing eco-friendly fabrics to implementing zero-waste pattern cutting techniques, we strive to minimize our environmental impact at every step. We work closely with local artisans and suppliers, reducing our carbon footprint while supporting local communities.
                </p>
                <p>
                  By choosing Rina Dharod, you're not just wearing beautiful clothing; you're supporting a movement towards a more sustainable and ethical fashion industry.
                </p>
              </div>

              <Button 
                size="lg"
                className="bg-[#94A7B4] hover:bg-[#7A8A95] text-white"
              >
                Learn About Our Practices
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 border-4 border-[#D4AF37] transform -translate-x-6 -translate-y-6 rounded-3xl" />
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg"
                  alt="Sustainable practices"
                  width={600}
                  height={400}
                  className="object-cover w-full h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

