'use client'

import { useState } from 'react'
import Header from '@/components/layout/header'
import { MapView } from '@/components/map/map-view'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const steps = [
  { id: 'local', label: 'Local' },
  { id: 'caracteristicas', label: 'Características' },
  { id: 'orcamento', label: 'Orçamento' },
  { id: 'informacoes', label: 'Informações' },
  { id: 'pagamento', label: 'Pagamento' }
]

export default function BuscarPage() {
  const [radius, setRadius] = useState([5])
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <Header isHome={false} />
      
      <div className="flex-1 container mx-auto px-4">
        <div className="h-full max-w-3xl mx-auto w-full py-8 flex flex-col justify-between">
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Onde você procura seu imóvel?
              </h1>
              <p className="text-gray-600">
                Defina a localização e o raio de busca para encontrarmos as melhores opções para você
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <Input
                  type="text"
                  placeholder="Digite um endereço ou região"
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Raio de busca
                  </label>
                  <span className="text-sm text-gray-500">
                    {radius[0].toFixed(2)} km
                  </span>
                </div>
                <Slider
                  defaultValue={[5]}
                  max={50}
                  step={0.25}
                  value={radius}
                  onValueChange={setRadius}
                />
              </div>

              <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                <MapView searchRadius={radius[0]} properties={[]} />
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center">
            <Link href={currentStep === 0 ? "/" : "#"}>
              <Button
                onClick={currentStep === 0 ? undefined : previousStep}
                variant="outline"
                className="h-10"
              >
                Voltar
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded-full ${
                    index === currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="h-10"
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
