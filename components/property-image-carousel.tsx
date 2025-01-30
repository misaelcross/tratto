'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PropertyImageCarouselProps {
  images: string[]
}

export function PropertyImageCarousel({ images }: PropertyImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Função para lidar com o scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    )
  }

  const scrollTo = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const scrollAmount = container.clientWidth
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative group w-full">
      <div className="relative">
        {/* Container das Imagens */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory no-scrollbar rounded-2xl"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative flex-none w-full md:w-1/3 aspect-video snap-center"
            >
              <div className="p-1">
                <Image
                  src={image}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Setas de Navegação */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between pointer-events-none z-50">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "pointer-events-auto bg-black/50 transition-all duration-200",
              "text-white rounded-full p-2 h-12 w-12",
              !showLeftArrow && "opacity-0 pointer-events-none"
            )}
            onClick={() => scrollTo('left')}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "pointer-events-auto bg-black/50 transition-all duration-200",
              "text-white rounded-full p-2 h-12 w-12",
              !showRightArrow && "opacity-0 pointer-events-none"
            )}
            onClick={() => scrollTo('right')}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
