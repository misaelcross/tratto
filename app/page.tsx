'use client'

import Link from "next/link"
import { Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyCard } from "@/components/property-card"
import { CampaignBanner } from "@/components/campaign-banner"
import { NetflixStyleCarousel } from "@/components/netflix-style-carousel"
import { PropertyViewer } from "@/components/property-viewer"
import { useState } from "react"

// Propriedades em destaque no hero
const heroProperties = [
  {
    id: 1,
    title: "Apartamento Luxuoso",
    price: "R$ 2.500.000",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "Jardins, São Paulo",
    specs: "4 quartos • 4 vagas • 380m²",
    score: 98,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 2,
    title: "Apartamento Alto Padrão",
    price: "R$ 1.850.000",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    location: "Vila Nova Conceição, São Paulo",
    specs: "3 quartos • 3 vagas • 180m²",
    score: 95,
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 3,
    title: "Casa Contemporânea com Piscina",
    price: "R$ 4.500.000",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
    location: "Alto de Pinheiros, São Paulo",
    specs: "5 quartos • 6 vagas • 550m²",
    score: 92,
    images: [
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 4,
    title: "Penthouse com Terraço Gourmet",
    price: "R$ 3.200.000",
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    location: "Itaim Bibi, São Paulo",
    specs: "4 quartos • 4 vagas • 300m²",
    score: 94,
    images: [
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 5,
    title: "Mansão com Vista para o Mar",
    price: "R$ 8.500.000",
    image: "https://images.pexels.com/photos/32870/pexels-photo.jpg",
    location: "Guarujá, São Paulo",
    specs: "6 quartos • 8 vagas • 850m²",
    score: 97,
    images: [
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 6,
    title: "Loft Industrial Moderno",
    price: "R$ 1.200.000",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    location: "Vila Leopoldina, São Paulo",
    specs: "2 quartos • 2 vagas • 120m²",
    score: 88,
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 7,
    title: "Apartamento Garden",
    price: "R$ 2.100.000",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    location: "Moema, São Paulo",
    specs: "3 quartos • 3 vagas • 200m²",
    score: 91,
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 8,
    title: "Casa em Condomínio Fechado",
    price: "R$ 5.900.000",
    image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
    location: "Alphaville, São Paulo",
    specs: "5 quartos • 6 vagas • 650m²",
    score: 96,
    images: [
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  }
]

export default function HomePage() {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<typeof heroProperties[0] | null>(null)

  const handlePropertyClick = (property: typeof heroProperties[0]) => {
    setSelectedProperty(property)
    setIsViewerOpen(true)
  }

  return (
    <main className="flex-1">
      <PropertyViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={selectedProperty ? selectedProperty.images : []}
      />
      <div className="space-y-12">
        {/* Seção 1: Campanha Local */}
        <section className="relative -mt-16">
          <CampaignBanner
            title="Verão Imobiliário 2025"
            description="Aproveite condições especiais em imóveis selecionados"
            imageUrl="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
            featuredProperties={heroProperties}
            onViewProperty={(property) => {
              setSelectedProperty(property)
              setIsViewerOpen(true)
            }}
          />
        </section>

        {/* Seção 2: Busca e Categorias */}
        <section className="container mx-auto px-4 py-6 space-y-4">
          {/* Barra de Busca */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Procure por um imóvel"
              className="w-full pl-12 pr-24"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Link href="/buscar">
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90 h-8 text-xs absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-6">
                Buscar
              </button>
            </Link>
          </div>

          {/* Categorias */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Link href="/apartamentos" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">🏢</span>
              <span className="text-sm text-gray-600">Apartamentos</span>
            </Link>
            <Link href="/casas" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">🏠</span>
              <span className="text-sm text-gray-600">Casas</span>
            </Link>
            <Link href="/condominios" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">🏘️</span>
              <span className="text-sm text-gray-600">Condomínios</span>
            </Link>
            <Link href="/comercial" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">🏪</span>
              <span className="text-sm text-gray-600">Comercial</span>
            </Link>
            <Link href="/lancamentos" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">🆕</span>
              <span className="text-sm text-gray-600">Lançamentos</span>
            </Link>
            <Link href="/investimentos" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">📈</span>
              <span className="text-sm text-gray-600">Investimentos</span>
            </Link>
            <Link href="/premium" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <span className="text-lg">✨</span>
              <span className="text-sm text-gray-600">Premium</span>
            </Link>
          </div>
        </section>

        <div className="container mx-auto px-4 space-y-12">
          {/* Seção 3: CTA Formulário */}
          <section className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Encontre seu imóvel ideal</h2>
            <p className="text-muted-foreground mb-6">
              Preencha nosso formulário e deixe-nos ajudar a encontrar o imóvel perfeito para você
            </p>
            <Link href="/buscar">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90 h-10 rounded-lg px-8">
                Preencher Formulário
              </button>
            </Link>
          </section>

          {/* Seção Financeira */}
          <section className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Meu Dinheiro</h2>
              <Link href="/financeiro" className="text-primary hover:text-primary/90">
                Meu Dinheiro
              </Link>
            </div>

            {/* Filtros */}
            <div className="flex gap-4 mb-8">
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground">
                Despesas
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                Receitas
              </button>
              <button className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
                Investimentos
              </button>
            </div>

            <h2 className="text-3xl font-bold mb-8">
              Gerencie suas finanças de forma inteligente e alcance seus objetivos
            </h2>

            {/* Grid de Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Widget 1 - Gastos Recorrentes */}
              <div className="rounded-xl bg-white p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Gastos Recorrentes</h3>
                <p className="text-muted-foreground mb-4">
                  Acompanhe seus gastos recorrentes e ajuste seu orçamento mensal.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span>Aluguel</span>
                    <span className="text-primary">R$ 2.500,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mercado</span>
                    <span className="text-primary">R$ 1.200,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Assinaturas</span>
                    <span className="text-primary">R$ 300,00</span>
                  </div>
                </div>
              </div>

              {/* Widget 2 - Planejamento Financeiro */}
              <div className="rounded-xl bg-gray-900 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-5 text-primary" />
                  <span className="text-primary text-sm">Alerta de orçamento</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Seu planejamento para o mês está em dia?
                </h3>
                <p className="text-gray-300 mb-4">
                  Faltam R$ 250,00 para atingir seu limite de gastos planejado.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-sm text-gray-400">Janeiro 2025</span>
                </div>
              </div>

              {/* Widget 3 - Controle de Economia */}
              <div className="rounded-xl bg-white p-6 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Controle de Economia</h3>
                <div className="text-5xl font-bold text-primary mb-4">104</div>
                <p className="text-muted-foreground mb-6">dias economizando</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="size-3 rounded-full bg-primary"
                    />
                  ))}
                </div>
                <Button className="w-full">
                  Ajustar Meta Agora
                </Button>
              </div>
            </div>
          </section>

          {/* Seção 5: Imóveis Personalizados (Estilo Netflix) */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recomendados para Você</h2>
            <NetflixStyleCarousel properties={recommendedProperties} />
          </section>

        </div>
      </div>
    </main>
  )
}

// Dados mockados com imagens do Pexels
const recommendedProperties = [
  {
    id: 1,
    title: "Apartamento Jardins",
    price: "R$ 850.000",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "Jardins, São Paulo",
    specs: "3 quartos • 2 vagas • 120m²",
    score: 90
  },
  {
    id: 2,
    title: "Cobertura Vila Nova Conceição",
    price: "R$ 2.100.000",
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    location: "Vila Nova Conceição, São Paulo",
    specs: "4 quartos • 4 vagas • 280m²",
    score: 92
  },
  {
    id: 3,
    title: "Casa Alto de Pinheiros",
    price: "R$ 3.900.000",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    location: "Alto de Pinheiros, São Paulo",
    specs: "5 quartos • 6 vagas • 450m²",
    score: 95
  },
  {
    id: 4,
    title: "Apartamento Itaim",
    price: "R$ 1.200.000",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    location: "Itaim Bibi, São Paulo",
    specs: "2 quartos • 2 vagas • 90m²",
    score: 88
  }
]

const properties = [
  {
    id: 5,
    title: "Casa Vila Mariana",
    price: "R$ 1.200.000",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    location: "Vila Mariana, São Paulo",
    specs: "4 quartos • 3 vagas • 200m²",
    score: 91
  },
  {
    id: 6,
    title: "Apartamento Moema",
    price: "R$ 950.000",
    image: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg",
    location: "Moema, São Paulo",
    specs: "3 quartos • 2 vagas • 110m²",
    score: 89
  },
  {
    id: 7,
    title: "Studio Pinheiros",
    price: "R$ 550.000",
    image: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    location: "Pinheiros, São Paulo",
    specs: "1 quarto • 1 vaga • 45m²",
    score: 85
  }
]

const readyProperties = [
  {
    id: 1,
    title: "Apartamento Pronto para Morar",
    price: "R$ 980.000",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "Perdizes, São Paulo",
    specs: "3 quartos • 2 vagas • 120m²",
    score: 89,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  },
  {
    id: 2,
    title: "Cobertura Duplex",
    price: "R$ 1.890.000",
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    location: "Vila Mariana, São Paulo",
    specs: "4 quartos • 4 vagas • 380m²",
    score: 94,
    images: [
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/32870/pexels-photo.jpg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
    ]
  }
]
