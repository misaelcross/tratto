"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"

interface Property {
  id: number
  title: string
  price: string
  image: string
  location: string
  specs: string
}

interface NetflixStyleCarouselProps {
  properties: Property[]
}

export function NetflixStyleCarousel({ properties }: NetflixStyleCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const scrollAmount = direction === "left" 
      ? -carouselRef.current.offsetWidth 
      : carouselRef.current.offsetWidth

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative group">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex-none w-[300px] snap-start transition-transform duration-300 hover:scale-[1.02]"
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
