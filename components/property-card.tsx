"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  id: number
  title: string
  price: string
  image: string
  location: string
  specs: string
  highlight?: boolean
  onView?: () => void
}

export function PropertyCard({ 
  id, 
  title, 
  price, 
  image, 
  location, 
  specs,
  highlight = false,
  onView 
}: PropertyCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300",
      highlight && "ring-2 ring-primary"
    )}>
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-primary mt-2">{price}</p>
        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{specs}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <button 
          onClick={onView}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border h-10 py-2 px-4 w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Visualizar
        </button>
      </CardFooter>
    </Card>
  )
}
