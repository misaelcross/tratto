'use client'

import { useState } from 'react'
import { PropertyViewer } from '@/components/property-viewer'
import { Button } from '@/components/ui/button'

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Viewer
      </Button>

      <PropertyViewer 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg']}
      />
    </div>
  )
}
