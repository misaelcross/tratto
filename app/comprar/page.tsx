'use client'

import Header from '@/components/layout/header'
import { 
  MessageSquare, 
  Home, 
  Bed, 
  Bath, 
  Car, 
  Trophy, 
  AlertCircle,
  Heart
} from 'lucide-react'
import Image from 'next/image'
import { MapView } from '@/components/map/map-view'
import { PropertyCardCarousel } from '@/components/property-card-carousel'
import { PropertyViewer } from '@/components/property-viewer'
import { useState } from 'react'

const properties = [
  {
    id: 1,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    ],
    price: 'R$ 850.000',
    score: 920,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      area: '120m²'
    }
  },
  {
    id: 2,
    images: [
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg',
      'https://images.pexels.com/photos/1643386/pexels-photo-1643386.jpeg'
    ],
    price: 'R$ 720.000',
    score: 875,
    details: {
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      area: '98m²'
    }
  },
  {
    id: 3,
    images: [
      'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg',
      'https://images.pexels.com/photos/1876046/pexels-photo-1876046.jpeg',
      'https://images.pexels.com/photos/1876047/pexels-photo-1876047.jpeg'
    ],
    price: 'R$ 1.150.000',
    score: 945,
    details: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      area: '180m²'
    }
  },
  {
    id: 4,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg',
      'https://images.pexels.com/photos/1396124/pexels-photo-1396124.jpeg'
    ],
    price: 'R$ 680.000',
    score: 890,
    details: {
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: '85m²'
    }
  },
  {
    id: 5,
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/2724750/pexels-photo-2724750.jpeg',
      'https://images.pexels.com/photos/2724751/pexels-photo-2724751.jpeg'
    ],
    price: 'R$ 950.000',
    score: 910,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: '145m²'
    }
  },
  {
    id: 6,
    images: [
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
      'https://images.pexels.com/photos/2089699/pexels-photo-2089699.jpeg',
      'https://images.pexels.com/photos/2089700/pexels-photo-2089700.jpeg'
    ],
    price: 'R$ 790.000',
    score: 865,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      area: '110m²'
    }
  },
  {
    id: 7,
    images: [
      'https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg',
      'https://images.pexels.com/photos/2089697/pexels-photo-2089697.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg'
    ],
    price: 'R$ 1.250.000',
    score: 935,
    details: {
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      area: '200m²'
    }
  },
  {
    id: 8,
    images: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
      'https://images.pexels.com/photos/2724747/pexels-photo-2724747.jpeg',
      'https://images.pexels.com/photos/2724746/pexels-photo-2724746.jpeg'
    ],
    price: 'R$ 620.000',
    score: 880,
    details: {
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: '75m²'
    }
  }
];

export default function ComprarPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  const handlePropertyView = (propertyId: number) => {
    setSelectedProperty(propertyId)
  }

  const handleCloseViewer = () => {
    setSelectedProperty(null)
  }

  const selectedPropertyData = properties.find(p => p.id === selectedProperty)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex">
        {/* Coluna do Mapa (50%) */}
        <div className="w-1/2 fixed left-0 h-[calc(100vh-4rem)] bg-white shadow-sm">
          <MapView />
        </div>

        {/* Coluna do Conteúdo (50%) */}
        <div className="w-1/2 ml-[50%] pt-8">
          <div className="container mx-auto px-4">
            {/* Grid de Imóveis */}
            <div className="grid grid-cols-2 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative">
                    <PropertyCardCarousel images={property.images} onPropertyView={handlePropertyView} propertyId={property.id} />
                    <div className="absolute top-3 left-3">
                      <button className="p-2 bg-white/80 hover:bg-white rounded-full">
                        <Heart className="h-6 w-6" />
                      </button>
                    </div>
                    <div className={`absolute top-3 right-3 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-white ${
                      property.score >= 900 
                        ? 'bg-green-900/25' 
                        : 'bg-yellow-900/25'
                    }`}>
                      <span>Score {property.score}</span>
                      {property.score < 900 && (
                        <AlertCircle className="size-4" />
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-[1.2rem] font-bold text-black">{property.price}</p>

                    {/* Property Details */}
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="flex items-center gap-2">
                        <Bed className="size-5 text-gray-400" />
                        <span className="text-gray-900">{property.details.bedrooms} quartos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="size-5 text-gray-400" />
                        <span className="text-gray-900">{property.details.bathrooms} banheiros</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="size-5 text-gray-400" />
                        <span className="text-gray-900">{property.details.parking} vaga(s)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="size-5 text-gray-400" />
                        <span className="text-gray-900">{property.details.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedPropertyData && (
        <PropertyViewer
          isOpen={selectedProperty !== null}
          onClose={handleCloseViewer}
          images={selectedPropertyData.images}
        />
      )}
    </div>
  )
}
