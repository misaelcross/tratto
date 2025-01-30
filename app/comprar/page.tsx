'use client'

import Header from '@/components/layout/header'
import { MessageSquare, Home, Bed, Bath, Car, Trophy, AlertCircle } from 'lucide-react'
import Image from 'next/image'

const properties = [
  {
    id: 1,
    title: 'Apartamento Vila Mariana',
    price: 'R$ 850.000',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    score: 85,
    desiredScore: 90,
    missingPoints: [
      { item: 'Piscina', points: 3 },
      { item: 'Academia', points: 2 }
    ],
    details: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      area: '120m²'
    }
  },
  {
    id: 2,
    title: 'Apartamento Moema',
    price: 'R$ 920.000',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    score: 95,
    desiredScore: 90,
    details: {
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: '130m²'
    }
  }
]

export default function ComprarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            {/* Coluna do Mapa (40%) */}
            <div className="w-[40%] sticky top-8 h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm p-4">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-medium">Mapa</span>
              </div>
            </div>

            {/* Coluna dos Imóveis (60%) */}
            <div className="w-[60%] space-y-6">
              {properties.map(property => (
                <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-[16/9] relative bg-gray-200">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{property.title}</h3>
                        <p className="text-2xl font-bold text-green-500 mt-1">{property.price}</p>
                      </div>
                      
                      {/* Score Indicator */}
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="size-5 text-green-500" />
                          <span className="font-medium">
                            Score: {property.score}/{property.desiredScore}
                          </span>
                        </div>
                        {property.score < property.desiredScore && property.missingPoints && (
                          <div className="bg-red-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-red-600 text-sm mb-2">
                              <AlertCircle className="size-4" />
                              <span className="font-medium">Pontos faltantes:</span>
                            </div>
                            {property.missingPoints.map((point, index) => (
                              <p key={index} className="text-sm text-red-600">
                                {point.item}: {point.points} pontos
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-4 gap-4 py-4 border-t">
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

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
                        Agendar Visita
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-black text-black hover:bg-gray-50">
                        <MessageSquare className="size-5 text-black" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
