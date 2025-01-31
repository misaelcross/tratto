'use client'

import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

interface PropertyImageProps {
  image: string
  onBack?: () => void
}

export function PropertyImage({ image, onBack }: PropertyImageProps) {
  return (
    <div className="aspect-[16/9] relative bg-gray-200">
      <Image
        src={image}
        alt="Imóvel"
        fill
        className="object-cover"
      />
      {onBack && (
        <button onClick={onBack} className="absolute top-3 left-3 p-2 bg-white/80 hover:bg-white rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
