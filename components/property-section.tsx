'use client'

import { useState } from 'react'
import { PropertyCard } from './property-card'
import { PropertyViewer } from './property-viewer'

interface Property {
  id: number
  title: string
  price: string
  image: string
  location: string
  specs: string
  score?: number
  highlight?: boolean
}

interface PropertySectionProps {
  properties: Property[]
  title?: string
  className?: string
}

export function PropertySection({ properties, title, className = '' }: PropertySectionProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    setIsViewerOpen(true)
  }

  return (
    <section className={className}>
      <PropertyViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={selectedProperty ? [selectedProperty.image] : []}
      />

      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            {...property}
            onView={() => handlePropertyClick(property)}
          />
        ))}
      </div>
    </section>
  )
}
