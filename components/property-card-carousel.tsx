'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface PropertyCardCarouselProps {
  images: string[]
  onPropertyView?: (propertyId: number) => void
  propertyId?: number
}

export function PropertyCardCarousel({ images, onPropertyView, propertyId }: PropertyCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleClick = () => {
    if (onPropertyView && propertyId) {
      onPropertyView(propertyId)
    }
  }

  return (
    <div 
      className="aspect-[16/9] relative bg-gray-200 cursor-pointer" 
      onClick={handleClick}
    >
      <Image
        src={images[currentIndex]}
        alt={`Imóvel - Imagem ${currentIndex + 1}`}
        fill
        className="object-cover"
      />
      
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
