"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

interface GalleryItem {
  id: number
  src: string
  alt: string
  category: string
  title: string
  description: string
}

// Extended gallery data with categories
const galleryItems: GalleryItem[] = [
  { id: 1, src: '/placeholder.svg', alt: 'Bridal Lehenga 1', category: 'bridal', title: 'Royal Bridal Ensemble', description: 'Exquisite hand-embroidered lehenga with gold thread work' },
  { id: 2, src: '/placeholder-designer.svg', alt: 'Festive Wear 1', category: 'festive', title: 'Festive Kurta Set', description: 'Contemporary kurta with traditional prints' },
  { id: 3, src: '/indian-pattern.svg', alt: 'Casual Wear 1', category: 'casual', title: 'Indo-Western Dress', description: 'Fusion wear perfect for modern occasions' },
  { id: 4, src: '/placeholder.svg', alt: 'Bridal Lehenga 2', category: 'bridal', title: 'Vintage Bridal Collection', description: 'Timeless elegance with modern silhouettes' },
  { id: 5, src: '/placeholder-designer.svg', alt: 'Festive Wear 2', category: 'festive', title: 'Celebration Anarkali', description: 'Flowing anarkali with intricate beadwork' },
  { id: 6, src: '/indian-pattern.svg', alt: 'Casual Wear 2', category: 'casual', title: 'Contemporary Jumpsuit', description: 'Modern jumpsuit with ethnic touches' },
  { id: 7, src: '/placeholder.svg', alt: 'Bridal Lehenga 3', category: 'bridal', title: 'Heritage Bridal Wear', description: 'Traditional craftsmanship meets modern design' },
  { id: 8, src: '/placeholder-designer.svg', alt: 'Festive Wear 3', category: 'festive', title: 'Designer Saree', description: 'Contemporary saree draping with fusion blouse' },
  { id: 9, src: '/indian-pattern.svg', alt: 'Casual Wear 3', category: 'casual', title: 'Casual Ethnic Coord', description: 'Comfortable yet elegant coordinate sets' },
]

const categories = [
  { id: 'all', label: 'All Collections', count: galleryItems.length },
  { id: 'bridal', label: 'Bridal Wear', count: galleryItems.filter(item => item.category === 'bridal').length },
  { id: 'festive', label: 'Festive Wear', count: galleryItems.filter(item => item.category === 'festive').length },
  { id: 'casual', label: 'Casual Wear', count: galleryItems.filter(item => item.category === 'casual').length },
]

export default function DynamicGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2D3436] mb-4">
          Our <span className="text-[#D4AF37]">Collections</span>
        </h1>
        <p className="text-lg text-[#94A7B4] max-w-2xl mx-auto">
          Explore our exquisite range of Indo-western ensembles, each piece crafted with love and attention to detail
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter Collections
          </Button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className={`transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white'
                  : 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden flex flex-col gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => {
                  handleCategoryChange(category.id)
                  setShowFilters(false)
                }}
                className={`w-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white'
                    : 'border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10'
                }`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                onClick={() => openLightbox(index)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <span className="text-[#2D3436] font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#2D3436] mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#94A7B4] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
        }
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="relative aspect-square max-h-[70vh] mx-auto">
              <Image
                src={filteredItems[currentImageIndex]?.src}
                alt={filteredItems[currentImageIndex]?.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-4 text-white">
              <h3 className="text-xl font-semibold mb-2">
                {filteredItems[currentImageIndex]?.title}
              </h3>
              <p className="text-white/80">
                {filteredItems[currentImageIndex]?.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-white/60">
                  {currentImageIndex + 1} of {filteredItems.length}
                </span>
                <Button 
                  size="sm"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}