'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'

const MAPTILER_KEY = '3At31yoEaW9sgkdxPBcO'

// Coordenadas de Campinas-SP
const CAMPINAS_COORDINATES = {
  lng: -47.0626,
  lat: -22.9099
}

interface PropertyMapViewProps {
  className?: string
}

export function PropertyMapView({ className = "h-[400px] rounded-lg" }: PropertyMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    maptilersdk.config.apiKey = MAPTILER_KEY

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/e36de874-3cc8-4bb5-89f3-d5285a116608/style.json',
      center: [CAMPINAS_COORDINATES.lng, CAMPINAS_COORDINATES.lat],
      zoom: 12 // Zoom adequado para visualização da cidade
    })

    // Cleanup on unmount
    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div ref={mapContainer} className={className} />
  )
}
