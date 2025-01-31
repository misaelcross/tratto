'use client'

import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Eye, 
  MoreHorizontal, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  ClipboardCheck, 
  MessageSquare, 
  Banknote, 
  Home, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PropertyImageCarousel } from './property-image-carousel'
import { PropertyMapView } from '@/components/map/property-map-view'

interface PropertyViewerProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
}

interface Review {
  id: number
  name: string
  date: string
  photo: string
  comment: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "João Silva",
    date: "Visitou em janeiro de 2025",
    photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    comment: "Apartamento incrível! Ambientes amplos, acabamento de primeira e uma vista deslumbrante. A localização é excelente, próximo a tudo que precisamos. O condomínio oferece uma estrutura completa, com academia bem equipada e área de lazer impecável. A varanda gourmet é um diferencial que vale muito a pena. Recomendo fortemente para quem busca conforto e qualidade de vida."
  },
  {
    id: 2,
    name: "Maria Oliveira",
    date: "Visitou em janeiro de 2025",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    comment: "Excelente oportunidade de investimento. O imóvel está em perfeito estado e a documentação toda em ordem."
  },
  {
    id: 3,
    name: "Pedro Santos",
    date: "Visitou em janeiro de 2025",
    photo: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    comment: "A vista da varanda é simplesmente espetacular! O acabamento é de altíssimo padrão e todos os ambientes são muito bem planejados. A área de lazer do condomínio é um capítulo à parte, com piscina aquecida, academia completa e espaço gourmet. Vale cada centavo do investimento."
  },
  {
    id: 4,
    name: "Ana Costa",
    date: "Visitou em janeiro de 2025",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    comment: "Localização privilegiada, próximo a tudo. O apartamento é muito bem distribuído e a varanda gourmet é um diferencial."
  }
]

export function PropertyViewer({ isOpen, onClose, images }: PropertyViewerProps) {
  const [expandedComments, setExpandedComments] = useState<number[]>([])

  const toggleComment = (reviewId: number) => {
    setExpandedComments(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  const shouldShowMore = (comment: string) => {
    return comment.length > 150
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full md:w-[80%] h-full md:h-[100vh] animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-y-auto relative z-[51]">
        {/* Navigation Bar */}
        <div className="h-16 px-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <button onClick={onClose} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="hidden md:block text-xl font-bold text-[rgb(34,197,94)]">
            Tratto
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2">
              <Share2 className="h-6 w-6" />
            </button>
            <button className="p-2">
              <Eye className="h-6 w-6" />
            </button>
            <button className="p-2">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <PropertyImageCarousel images={images} />
          
          {/* Main Content */}
          <div className="mt-8 flex gap-8">
            {/* Left Column */}
            <div className="flex-1">
              {/* Seção: Espaço Inteiro */}
              <div className="pb-6">
                <h2 className="text-2xl font-semibold mb-4">Apartamento de Alto Padrão à Venda</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>Jardins, São Paulo</span>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-4 mt-4 border rounded-lg px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Preferido dos compradores</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">No top 5% da região</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">4.96 · 32 avaliações</span>
                  </div>
                </div>

                {/* Vendedor */}
                <div className="mt-6 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                      👨‍💼
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Imobiliária</p>
                      <p className="font-medium">Tratto Imóveis</p>
                    </div>
                  </div>
                </div>

                {/* Características Principais */}
                <div className="flex flex-col gap-6 mt-6 border-t border-b border-gray-200 py-12">
                  <div className="flex gap-4">
                    <span className="text-xl">🚶‍♂️</span>
                    <div>
                      <h4 className="font-semibold">Localização privilegiada</h4>
                      <p className="text-gray-600">5 minutos até o metrô, próximo a restaurantes e comércio</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-xl">📋</span>
                    <div>
                      <h4 className="font-semibold">Documentação regularizada</h4>
                      <p className="text-gray-600">Escritura registrada e IPTU em dia</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-xl">🔑</span>
                    <div>
                      <h4 className="font-semibold">Disponibilidade imediata</h4>
                      <p className="text-gray-600">Pronto para morar, sem reformas necessárias</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção: O que este lugar oferece */}
              <div className="py-12">
                <h3 className="text-xl font-semibold mb-4">Características do Imóvel</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🛏️</span>
                    <span>4 Quartos (2 suítes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚗</span>
                    <span>4 Vagas de Garagem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📏</span>
                    <span>380m² de Área Total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍖</span>
                    <span>Varanda Gourmet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏋️‍♂️</span>
                    <span>Academia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏊‍♂️</span>
                    <span>Piscina</span>
                  </div>
                </div>
                <button className="mt-6 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                  Mostrar todas as 12 comodidades
                </button>
              </div>

            </div>

            {/* Right Column - Sticky - Hidden on Mobile */}
            <div className="hidden md:block w-[380px]">
              <div className="border rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-semibold">R$ 2.500.000</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 · 32 avaliações</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600">
                    Agendar Visita
                  </button>
                  <button className="w-full border border-green-500 text-green-500 py-3 rounded-lg font-medium hover:bg-green-50">
                    Entrar em Contato
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Imóvel disponível para visitas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <Users className="h-4 w-4" />
                    <span>Acompanhamento exclusivo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-[52] shadow-lg">
              <div className="flex gap-4 max-w-lg mx-auto">
                <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium active:bg-green-600">
                  Agendar Visita
                </button>
                <button className="flex-1 border border-green-500 text-green-500 py-3 rounded-lg font-medium active:bg-green-50">
                  Entrar em Contato
                </button>
              </div>
            </div>

            {/* Mobile Price Display - Top of content */}
            <div className="hidden">
              <div className="p-4">
                <span className="text-2xl font-semibold block">R$ 2.500.000</span>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">4.9 · 32 avaliações</span>
                </div>
              </div>
            </div>

          </div>

          {/* Full Width Sections */}
          <div className="mt-12">
            {/* Seção: Resumo das Avaliações */}
            <div className="pt-12">
              <div className="flex flex-col items-center text-center border-t border-b border-gray-200 py-12">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-semibold">5,0</span>
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Preferido dos compradores</h3>
                <p className="text-gray-600 mb-8">
                  Este imóvel está no top 5% dos anúncios mais bem avaliados, baseado em visitas, avaliações e confiabilidade
                </p>

                {/* Grid de Avaliações */}
                <div className="w-full grid grid-cols-1 md:grid-cols-6 justify-between gap-8">
                  {/* Avaliação Geral */}
                  <div className="flex flex-col items-start">
                    <div className="text-sm font-medium mb-1">Avaliação geral</div>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-3">{rating}</span>
                        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-900 rounded-full" 
                            style={{ 
                              width: rating === 5 ? '100%' : 
                                    rating === 4 ? '20%' : 
                                    rating === 3 ? '10%' : 
                                    rating === 2 ? '5%' : '0%' 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Categorias */}
                  <div className="flex flex-col justify-between h-32 pb-2">
                    <div>
                      <div className="text-sm text-gray-600 text-left">Exatidão do anúncio</div>
                      <div className="font-semibold text-left">5,0</div>
                    </div>
                    <div>
                      <ClipboardCheck className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-32 pb-2">
                    <div>
                      <div className="text-sm text-gray-600 text-left">Comunicação</div>
                      <div className="font-semibold text-left">5,0</div>
                    </div>
                    <div>
                      <MessageSquare className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-32 pb-2">
                    <div>
                      <div className="text-sm text-gray-600 text-left">Localização</div>
                      <div className="font-semibold text-left">5,0</div>
                    </div>
                    <div>
                      <MapPin className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-32 pb-2">
                    <div>
                      <div className="text-sm text-gray-600 text-left">Condições do imóvel</div>
                      <div className="font-semibold text-left">5,0</div>
                    </div>
                    <div>
                      <Home className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-32 pb-2">
                    <div>
                      <div className="text-sm text-gray-600 text-left">Custo-benefício</div>
                      <div className="font-semibold text-left">4,9</div>
                    </div>
                    <div>
                      <Banknote className="h-8 w-8 text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Depoimentos */}
            <div className="py-12 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-8">O que dizem nossos visitantes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={review.photo}
                        alt={review.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-gray-600 text-sm mb-2">{review.date}</div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                Ver todos os 28 comentários
              </button>
            </div>

            {/* Seção: Mapa */}
            <div className="py-12 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-8">Localização</h3>
              <PropertyMapView />
            </div>

            {/* Seção: Vendedor */}
            <div className="py-12 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-8">Mais sobre o vendedor</h2>
              <div className="flex flex-col md:flex-row gap-12">
                {/* Coluna Esquerda */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 relative mb-4">
                        <Image
                          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                          alt="Marcelo"
                          fill
                          className="rounded-full object-cover"
                        />
                        <div className="absolute -right-1 -bottom-1 bg-rose-500 text-white p-1 rounded-full">
                          <Star className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xl font-semibold">Marcelo</div>
                      <div className="text-gray-600 mb-6">Especialista Imobiliário</div>
                      
                      <div className="flex gap-8 mb-8">
                        <div className="text-center">
                          <div className="text-xl font-semibold">51</div>
                          <div className="text-sm text-gray-600">avaliações</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold flex items-center gap-1">
                            5,0 <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="text-sm text-gray-600">estrelas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold">2</div>
                          <div className="text-sm text-gray-600">anos na Tratto</div>
                        </div>
                      </div>

                      <div className="w-full space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <span>Atua no mercado desde 2010</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-600" />
                          <span>Formação: Administração e Negócios</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-gray-600" />
                          <span>Nasceu na década de 80</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-gray-600" />
                          <span>Onde estudei: Faculdade Estácio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="flex-1">
                  <div className="text-xl font-semibold mb-4">Marcelo é Superhost</div>
                  <div className="text-gray-600 mb-8">
                    Corretores Superhost são profissionais experientes, com ótimas avaliações e que se destacam pelo compromisso em oferecer negociações transparentes e atendimento excepcional aos compradores.
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-sm font-medium">Taxa de resposta</div>
                      <div className="text-gray-600">100%</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Tempo de resposta</div>
                      <div className="text-gray-600">Responde em até 1 hora</div>
                    </div>
                  </div>

                  <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600">
                    Entre em contato com o corretor
                  </button>

                  <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>Para ajudar a proteger seu pagamento, sempre use a Tratto para enviar dinheiro e se comunicar com os corretores.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nova seção de informações do imóvel */}
            <div className="mt-12 border-t pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Coluna 1 - Regras da Negociação */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Regras da Negociação</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Documentação completa e regularizada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Imóvel disponível para visitas técnicas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Negociação com proprietário direto</span>
                    </li>
                  </ul>
                  <button className="text-green-500 hover:text-green-600 text-sm font-medium">
                    Ver mais detalhes
                  </button>
                </div>

                {/* Coluna 2 - Segurança e Infraestrutura */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Segurança e Infraestrutura</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Portaria 24h com sistema de câmeras</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">2 vagas de garagem cobertas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Área de lazer completa</span>
                    </li>
                  </ul>
                  <button className="text-green-500 hover:text-green-600 text-sm font-medium">
                    Ver todas as comodidades
                  </button>
                </div>

                {/* Coluna 3 - Política de Compra */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Política de Compra</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      Processo de compra simplificado e seguro através da Tratto, com suporte jurídico em todas as etapas da negociação.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">Assessoria jurídica inclusa</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">Análise documental gratuita</span>
                      </li>
                    </ul>
                  </div>
                  <button className="text-green-500 hover:text-green-600 text-sm font-medium">
                    Ver política completa
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer section */}
          <div className="mt-12 border-t pt-12 pb-24 md:pb-12">
            {/* App store badges */}
            <div className="flex justify-center space-x-4 mb-8">
              <Link href="https://apps.apple.com/app/tratto" target="_blank" className="hover:opacity-80">
                <Image
                  src="/App_Store_Badge.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.tratto" target="_blank" className="hover:opacity-80">
                <Image
                  src="/GooglePlay_Badge.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-[42px] w-auto"
                />
              </Link>
            </div>

            {/* Social media and copyright */}
            <div className="flex items-center justify-center space-x-6 text-gray-600">
              <span className="text-2xl font-semibold text-green-500">Tratto</span>
              <span className="text-sm">Siga nas redes sociais</span>
              <div className="flex items-center space-x-4">
                <Link href="https://instagram.com/tratto" target="_blank" className="hover:text-green-500">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://facebook.com/tratto" target="_blank" className="hover:text-green-500">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://youtube.com/tratto" target="_blank" className="hover:text-green-500">
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link href="https://tiktok.com/@tratto" target="_blank" className="hover:text-green-500">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </Link>
              </div>
              <span className="text-sm"> 2025 Tratto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
