'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import * as maptilersdk from '@maptiler/sdk'
import * as turf from '@turf/turf'
import { MapPin } from 'lucide-react'
import '@maptiler/sdk/dist/maptiler-sdk.css'

const MAPTILER_KEY = '3At31yoEaW9sgkdxPBcO'

// Coordenadas iniciais de Campinas-SP
const INITIAL_COORDINATES = {
  lng: -47.0626,
  lat: -22.9099
}

interface MapViewProps {
  searchRadius?: number // em km
}

export function MapView({ searchRadius = 5 }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const marker = useRef<maplibregl.Marker | null>(null)
  const [center, setCenter] = useState(INITIAL_COORDINATES)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectionMode, setSelectionMode] = useState(false)
  
  const circleSourceId = 'search-radius'
  const circleLayerId = 'search-radius-circle'

  // Função para criar/atualizar o círculo
  const updateSearchCircle = () => {
    if (!map.current || !mapLoaded) return

    try {
      // Criar um círculo usando turf
      const centerPoint = turf.point([center.lng, center.lat])
      const circle = turf.circle(centerPoint, searchRadius, {
        steps: 64,
        units: 'kilometers'
      })

      // Atualizar a fonte existente ou criar uma nova
      const source = map.current.getSource(circleSourceId) as maplibregl.GeoJSONSource
      if (source) {
        source.setData(circle)
      } else {
        // Se a fonte não existe, criar fonte e camada
        map.current.addSource(circleSourceId, {
          type: 'geojson',
          data: circle
        })

        map.current.addLayer({
          id: circleLayerId,
          type: 'fill',
          source: circleSourceId,
          paint: {
            'fill-color': '#0A5351',
            'fill-opacity': 0.2,
            'fill-outline-color': '#0A5351'
          }
        })
      }

      // Ajustar o zoom do mapa para mostrar todo o círculo
      const bounds = turf.bbox(circle)
      map.current.fitBounds(bounds as [number, number, number, number], {
        padding: 50,
        animate: true,
        duration: 500
      })
    } catch (error) {
      console.error('Error updating search circle:', error)
    }
  }

  // Função para atualizar o marcador
  const updateMarker = () => {
    if (!map.current || !mapLoaded) return

    if (!marker.current) {
      // Criar um elemento personalizado para o marcador
      const el = document.createElement('div')
      el.className = 'w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg cursor-move'
      
      // Criar o marcador arrastável
      marker.current = new maplibregl.Marker({
        element: el,
        draggable: !selectionMode
      })
        .setLngLat([center.lng, center.lat])
        .addTo(map.current)

      // Atualizar o centro quando o marcador for arrastado
      marker.current.on('dragend', () => {
        const lngLat = marker.current?.getLngLat()
        if (lngLat) {
          setCenter({ lng: lngLat.lng, lat: lngLat.lat })
        }
      })
    } else {
      marker.current.setLngLat([center.lng, center.lat])
      marker.current.setDraggable(!selectionMode)
    }
  }

  // Função para alternar o modo de seleção
  const toggleSelectionMode = () => {
    setSelectionMode(prev => !prev)
  }

  // Função para lidar com o clique no mapa
  const handleMapClick = (e: maplibregl.MapMouseEvent & { originalEvent: MouseEvent }) => {
    if (!selectionMode) return
    
    const newCenter = { lng: e.lngLat.lng, lat: e.lngLat.lat }
    setCenter(newCenter)
    setSelectionMode(false)
    e.originalEvent.stopPropagation()
  }

  // Inicializar o mapa
  useEffect(() => {
    if (!mapContainer.current) return

    maptilersdk.config.apiKey = MAPTILER_KEY

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/e36de874-3cc8-4bb5-89f3-d5285a116608/style.json',
      center: [center.lng, center.lat],
      zoom: 12
    })

    map.current.on('load', () => {
      setMapLoaded(true)
      updateMarker()
      updateSearchCircle()
    })

    return () => {
      if (map.current && mapLoaded) {
        if (map.current.getLayer(circleLayerId)) {
          map.current.removeLayer(circleLayerId)
        }
        if (map.current.getSource(circleSourceId)) {
          map.current.removeSource(circleSourceId)
        }
      }
      marker.current?.remove()
      map.current?.remove()
    }
  }, [])

  // Atualizar o cursor e eventos do mapa quando o modo de seleção mudar
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Atualizar cursor
    map.current.getCanvas().style.cursor = selectionMode ? 'crosshair' : ''

    // Remover evento de clique existente
    map.current.off('click', handleMapClick)

    // Adicionar evento de clique se estiver no modo de seleção
    if (selectionMode) {
      map.current.on('click', handleMapClick)
    }

    return () => {
      if (map.current) {
        map.current.off('click', handleMapClick)
      }
    }
  }, [selectionMode, mapLoaded])

  // Atualizar o círculo quando o raio ou centro mudar
  useEffect(() => {
    if (mapLoaded) {
      updateSearchCircle()
      updateMarker()
    }
  }, [searchRadius, center, mapLoaded])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Botão flutuante para modo de seleção */}
      <button
        onClick={toggleSelectionMode}
        className={`absolute top-2 left-2 p-2 bg-white rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors ${
          selectionMode ? 'bg-primary text-white hover:bg-primary/90' : ''
        }`}
        title={selectionMode ? 'Cancelar seleção' : 'Selecionar ponto central'}
      >
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  )
}
