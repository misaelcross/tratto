import Image from 'next/image'
import Header from '@/components/layout/header'
import { MessageSquare, Home, Bed, Trophy, MapPin, ChevronRight } from 'lucide-react'

const propertyImages = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
]

export default function ImoveisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-12 pb-16">
        {/* Seção 1: Preferências */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Minhas Preferências</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Bed className="size-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Quartos</p>
                  <p className="font-medium">3 quartos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="size-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Lazer</p>
                  <p className="font-medium">Piscina, Academia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="size-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Score Desejado</p>
                  <p className="font-medium">900+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-medium">Vila Mariana, SP</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Imóveis com Match Perfeito */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Imóveis com Match Perfeito</h2>
          <div className="grid grid-cols-3 gap-6">
            {propertyImages.slice(0, 3).map((img, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm perfect-match-property">
                <div className="relative h-48">
                  <Image
                    src={img}
                    alt="Imóvel"
                    fill
                    className="object-cover perfect-match-image"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full">
                    Score {920 - index * 10}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Apartamento Vila Mariana</h3>
                  <p className="text-gray-600 text-sm mb-3">3 quartos • 2 vagas • 120m²</p>
                  <p className="text-green-500 font-semibold">R$ 850.000</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-green-50 rounded-xl p-6">
            <p className="text-gray-700">
              <span className="font-semibold">Dica:</span> Se você remover &ldquo;Piscina&rdquo; dos requisitos,
              terá acesso a mais 7 imóveis com match no score desejado.
            </p>
          </div>
        </section>

        {/* Seção 3: Próximos do Score */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Próximos do Score Desejado</h2>
          <div className="grid grid-cols-3 gap-6">
            {propertyImages.slice(2, 5).map((img, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src={img}
                    alt="Imóvel"
                    fill
                    className="object-cover grayscale"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full">
                    Score {880 - index * 10}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Apartamento Moema</h3>
                  <p className="text-gray-600 text-sm mb-3">3 quartos • 2 vagas • 110m²</p>
                  <p className="text-green-500 font-semibold">R$ 790.000</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 4: CTA Assistente */}
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-green-500 rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-semibold mb-4">Precisa de ajuda para encontrar seu imóvel ideal?</h2>
            <p className="mb-6 text-green-50">Nosso assistente IA está pronto para ajudar você a encontrar o imóvel perfeito!</p>
            <button className="bg-white text-green-500 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-green-50">
              <MessageSquare className="size-5" />
              Falar com Assistente
            </button>
          </div>
        </section>

        {/* Seção 5: Outros Imóveis */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Outros Imóveis</h2>
            <button className="text-green-500 font-medium inline-flex items-center gap-1 hover:text-green-600">
              Ver todos
              <ChevronRight className="size-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {propertyImages.slice(0, 3).map((img, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src={img}
                    alt="Imóvel"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Apartamento Jardins</h3>
                  <p className="text-gray-600 text-sm mb-3">4 quartos • 3 vagas • 150m²</p>
                  <p className="text-green-500 font-semibold">R$ 1.200.000</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
