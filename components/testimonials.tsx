"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  location: string
  image: string
  rating: number
  text: string
  occasion: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Meghna doshi",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "I am giving my outfits to Rina Dharod since last 10/12 years and I loved wearing all my outfits designed by her. She is really very excellent designer cum stylist, by nature also she is very calm and polite lady who always works as per ... More",
    occasion: "Designer Wear"
  },
  {
    id: 2,
    name: "Rashmin Desai",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "For our sons wedding we came to Rina Dharod. We had a very good experience anddl Rina ma'am had a absolute hands on knowledge and perfect guidance about how to go about the entire wardrobe. Right from colour combination and complementing ... More",
    occasion: "Wedding"
  },
  {
    id: 3,
    name: "Bimal Gupta",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "So I had my mom's 30 year old Banarasi saree which I wanted to be a part of my current wardrobe. I took it to Rina and told her about all my requirements. And the results were outstanding... loved the placement of work.... Borders,laces ... More",
    occasion: "Saree Transformation"
  },
  {
    id: 4,
    name: "Anjali Sansare",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "\"Rina Dharod the fashion labels ,dresses are fabulous, and her fitting skills are fantastic! There's no word to describe her exceptional work. All our friends and family have complimented me on my dress, and the credit goes entirely to team Rina Dharod the fashion labels impeccable craftsmanship.\"",
    occasion: "Custom Dress"
  },
  {
    id: 5,
    name: "Hemal shah",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "This place is very good to get your customized outfit. Reena aunty was quick in understanding my requirements very clearly. She has good taste and guides / explores best of the options suitable to me. Her team is also very good, keeps you posted of every little progress made. Overall I had a satisfactory experience and a dreamy look",
    occasion: "Customized Outfit"
  },
  {
    id: 6,
    name: "Sanjana Adivasi",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "The feeling I got when I walked into the boutique was warm and welcoming. Everything from the soft music to the elegant displays made me feel relaxed and happy. The staff were kind and helpful, which added to the overall pleasant vibe. It was a lovely feeling to shop in such a beautiful space.",
    occasion: "Boutique Visit"
  },
  {
    id: 7,
    name: "Shruti Trivedi",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "One place where fashion meets satisfaction. Rina has years of experience which gives special touch to each outfit and it reflects in her work. Too good",
    occasion: "Custom Outfit"
  },
  {
    id: 8,
    name: "Sonal Modi",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Nice place and good collection. Reena and her team is very humble and polite. Special highlight very punctual and profetional ,fit was excellent.",
    occasion: "Custom Fit"
  },
  {
    id: 9,
    name: "Rita patel",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Extraordinary experience !we sober look ,very nice colour combinations ,friendly team ,helped in styling also .My daughter was in usa we went on vidieo calls and executed the piece .The outcome was more better then what we imagined .our full family looks were planned here .superb work !highly recommend!",
    occasion: "Family Outfits"
  },
  {
    id: 10,
    name: "Ushma Shah",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Very good stock and staff. The entire tr was courteous. The alternation was also done within minutes. Good experience overall",
    occasion: "Alteration"
  },
  {
    id: 11,
    name: "Trupti Kapadia",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "I had reached out to Rina through a common connect at last minute to an event desperately seeking an apt dress for the same. Inspite of not being her regular client, she and her staff were extremely accommodative and willing to assist in ... More",
    occasion: "Last Minute Event"
  },
  {
    id: 12,
    name: "Kashish Rai",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Really great work i got a formal shirt stitched and it was the best i've ever gotten stitched",
    occasion: "Formal Shirt"
  },
  {
    id: 13,
    name: "Harshada Chaudhari",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "The boutique collection is something different, chic and stylish. Rina's fashion sense is ultimate...I absolutely love it....she design dresses thoughtfully by keeping customers need in mind. The stitching also is so professional that the ... More",
    occasion: "Boutique Collection"
  },
  {
    id: 14,
    name: "Mansi Parekh",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Well she is very innovative when it comes to fabric... her style is unmatched... must try to know the worth...",
    occasion: "Fabric Innovation"
  },
  {
    id: 15,
    name: "Sheetal Goradia",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "The cot set stitched was perfect and the fitting along with the quality of stitch is very good. Must try once, as I have been the customer for a long time, still satisfied and never got any complaint.... More",
    occasion: "Cot Set"
  },
  {
    id: 16,
    name: "Yogita Mehta",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Nice collection .customise dress fitted amazingly and excellent finishing .Thank you team Rina Dharod",
    occasion: "Customise Dress"
  },
  {
    id: 17,
    name: "shreya modi",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "My partner and I got our wedding haldi dress customised with Rina Dharod. She is an extremely experienced designer and precisely knows what will look good on your body type. We are very happy with the outcome.... More",
    occasion: "Wedding Haldi Dress"
  },
  {
    id: 18,
    name: "Nikita Shah",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Very nice customised draping with excellent fitting woow",
    occasion: "Customised Draping"
  },
  {
    id: 19,
    name: "Niyanta Patil",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Rina and her team did an amazing job by delivering super amazing outfits for my sister's wedding..she not only did my outfits but my mom and sister got their outfits from her and they were just amazing. Definitely coming back to her for her other outfits.... More",
    occasion: "Sister's Wedding"
  },
  {
    id: 20,
    name: "krina saiya",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "She is making my outfits since six years now and I am highly satisfied with her style and services..She is so much graceful and soft spoken person and understand fashion as personality so well..She provides perfect fitting and style.. Specially her handwork and cuts are amazing..Keep growing",
    occasion: "Repeat Customer"
  },
  {
    id: 21,
    name: "Grishma Rambhia",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Excellent service, superb creativity... She has created couple of heavy dresses for my cousin's wedding and I am an awestruck with final result it was beyond my imagination.. She is so sensible to understand personalty based garmet that you ... More",
    occasion: "Cousin's Wedding"
  },
  {
    id: 22,
    name: "Rupal bhayani",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Best collection and good nature for honour",
    occasion: "Good Collection"
  },
  {
    id: 23,
    name: "Sangeeta Chawla",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Good quality, tailor made and value for money. Rina will make sure that the fitting is to the T! ... More",
    occasion: "Tailor Made"
  },
  {
    id: 24,
    name: "Asha Shah",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Very good collection",
    occasion: "Good Collection"
  },
  {
    id: 25,
    name: "HIREN T. - ANTZ Events",
    location: "",
    image: "/placeholder.svg",
    rating: 5,
    text: "Great stuff with very reasonable prices with style intact.",
    occasion: "Reasonable Prices"
  }
]

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  
  // Duplicate the testimonials to create a seamless loop effect
  const duplicatedTestimonials = [...testimonials, ...testimonials]
  
  // Effect to restart animation when paused state changes
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      if (isPaused) {
        scrollContainer.classList.add('pause-animation');
      } else {
        scrollContainer.classList.remove('pause-animation');
      }
    }
  }, [isPaused]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#FDF7E7]/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 opacity-5">
        <Image
          src="/indian-pattern.svg"
          alt="Background pattern"
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2D3436] mb-4">
            What Our <span className="text-[#D4AF37]">Clients Say</span>
          </h2>
          <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto mb-4" />
          <p className="text-lg text-[#94A7B4] max-w-2xl mx-auto">
            Real stories from real clients who trusted us with their special moments
          </p>
        </div>

        {/* Continuous scrolling testimonials - horizontal */}
        <div 
          className="mb-16 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlays for fading effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          
          {/* The actual scrolling container */}
          <div className={`flex gap-6 py-6 scroll-container ${isPaused ? 'pause-animation' : 'animate-scroll'}`}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-none w-[340px] bg-white rounded-xl shadow-md p-6 border border-[#94A7B4]/10 hover:border-[#D4AF37]/30 hover:shadow-lg transition-all flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-[#2D3436] leading-relaxed mb-4 flex-grow italic">
                  "{testimonial.text.split("... More")[0]}"
                </blockquote>

                {/* Client Info */}
                <div className="border-t border-[#94A7B4]/10 pt-3 flex justify-between items-center mt-auto">
                  <div>
                    <h4 className="font-medium text-[#2D3436]">
                      {testimonial.name}
                    </h4>
                  </div>
                  <div>
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {testimonial.occasion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-serif text-[#2D3436] mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-[#94A7B4] mb-6 max-w-xl mx-auto">
            Join hundreds of satisfied clients who chose Rina Dharod for their special moments
          </p>
          <Button 
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white transform hover:scale-105 transition-all duration-300"
          >
            Book Your Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}