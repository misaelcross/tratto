"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HeroCardProps {
  id: number
  title: string
  price: string
  image: string
  location: string
  specs: string
  score: number
  isActive?: boolean
  onClick: (id: number) => void
  onView?: () => void
}

export function HeroCard({
  id,
  title,
  image,
  location,
  specs,
  score,
  isActive = false,
  onClick,
  onView
}: HeroCardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "relative min-w-[250px] aspect-[4/5] rounded-lg overflow-hidden cursor-pointer",
        "transition-all duration-300 hover:z-10",
        isActive 
          ? "ring-4 ring-[hsl(127.82deg_100%_48.65%)] scale-105 z-2 border-2 border-white" 
          : "hover:ring-2 hover:ring-primary/50 hover:scale-[1.02]"
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={cn(
          "object-cover transition-transform duration-300",
          !isActive && "hover:scale-105"
        )}
      />
      {/* Gradiente escuro para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <Badge 
          variant="secondary" 
          className="mb-4 bg-white/10 hover:bg-white/20 text-white"
        >
          Score {score}
        </Badge>
        <p className="text-base text-white/90 mb-2">
          {location}
        </p>
        <p className="text-sm text-white/75 mb-4">
          {specs}
        </p>
        {isActive && (
          <Button 
            variant="outline" 
            className="w-full border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              if (onView) onView()
            }}
          >
            Visualizar
          </Button>
        )}
      </div>
    </div>
  )
}
