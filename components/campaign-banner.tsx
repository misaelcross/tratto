'use client'

import { useState, useRef, useEffect } from 'react'
import { HeroCard } from '@/components/hero-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Property {
  id: number
  title: string
  price: string
  image: string
  location: string
  specs: string
  score: number
}

interface CampaignBannerProps {
  title: string
  description: string
  imageUrl: string
  featuredProperties: Property[]
  onViewProperty?: (property: Property) => void
}

export function CampaignBanner({ 
  title, 
  description, 
  imageUrl,
  featuredProperties,
  onViewProperty 
}: CampaignBannerProps) {
  const [activeProperty, setActiveProperty] = useState<number>(featuredProperties[0]?.id)
  const [backgroundImage, setBackgroundImage] = useState(imageUrl)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [duplicatedProperties, setDuplicatedProperties] = useState<Property[]>([])
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Duplicar as propriedades para criar o efeito de scroll infinito
  useEffect(() => {
    setDuplicatedProperties([...featuredProperties, ...featuredProperties, ...featuredProperties])
  }, [featuredProperties])

  // Função para lidar com o scroll infinito
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    // Mostrar/esconder setas baseado na posição do scroll
    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    )
  }

  const scrollTo = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const scrollAmount = container.clientWidth * 0.8 // 80% da largura visível
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  const handlePropertyClick = (id: number) => {
    setActiveProperty(id)
    const property = featuredProperties.find(p => p.id === id)
    if (property) {
      setBackgroundImage(property.image)
    }
  }

  return (
    <div className="relative h-[800px]">
      {/* Imagem de fundo com transição suave */}
      <div className="absolute inset-0 transition-opacity duration-500">
        <Image
          src={backgroundImage}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Conteúdo do banner */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Textos */}
        <div className="container mx-auto px-4 flex-1 flex items-end">
          <div className="max-w-2xl pb-24">
            <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-white/90 text-xl">{description}</p>
          </div>
        </div>

        {/* Cards em destaque com scroll infinito */}
        <div className="w-full">
          <div className="relative">
            {/* Container dos Cards */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth px-[10%] py-6 hide-scrollbar"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {duplicatedProperties.map((property, index) => (
                <HeroCard
                  key={`${property.id}-${index}`}
                  {...property}
                  isActive={property.id === activeProperty}
                  onClick={handlePropertyClick}
                  onView={() => onViewProperty?.(property)}
                />
              ))}
            </div>

            {/* Setas de Navegação */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between pointer-events-none z-10">
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
      </div>
    </div>
  )
}
