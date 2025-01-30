'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Imagens do Pexels que estamos usando no site
const HERO_IMAGE = "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
const CALCULATOR_IMAGE = "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"

export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-[#0E4B45] -mt-16">
        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 relative">
            <div className="ml-auto w-[684px] pt-32 pb-16 px-4">
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-1 text-[#F3FEFE] w-fit bg-[#296D6B] px-4 py-1 rounded-md">
                <span>🏢</span>
                <p className="text-sm font-normal whitespace-nowrap">12</p>
                <p className="text-sm font-extralight whitespace-nowrap">casas vendidas nos últimos dias</p>
              </div>

              {/* Hero Content */}
              <h1 className="text-4xl md:text-5xl font-light text-white mt-8">
                Encontre a casa dos seus sonhos
              </h1>

              {/* Search Form */}
              <div className="bg-[#296D6B] p-4 rounded-lg shadow-lg mt-8">
                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-4 bg-[#0A5351] p-1 rounded-md w-fit">
                  <button className="py-2 px-4 rounded text-sm font-medium bg-white text-[#0A5351]">
                    Comprar
                  </button>
                  <button className="py-2 px-4 rounded text-sm font-medium text-white">
                    Se planejar
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-sm font-medium text-white">Cidade</span>
                    <div className="flex gap-2">
                      <Input 
                        type="text" 
                        placeholder="Localização, Campinas" 
                        className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white focus:text-black"
                      />
                      <Button className="h-12 bg-[#C5E99F] hover:bg-[#B5D98F] text-[#0A5351] font-medium">
                        Buscar Imóveis
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="relative w-full bg-[#0A5351] mt-8">
              <div className="ml-auto w-[684px] py-12 px-4">
                <div className="flex gap-12 text-white w-full">
                  <div className="flex-1">
                    <p className="text-3xl font-bold">1.245</p>
                    <p className="text-sm text-white/80">Imóveis</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold">32</p>
                    <p className="text-sm text-white/80">Cidades</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-sm text-white/80">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative min-h-[500px]">
            <Image
              src={HERO_IMAGE}
              alt="Hero background"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#0E4B45] rounded-lg overflow-hidden">
            <div className="flex">
              {/* Left Content */}
              <div className="w-1/2 p-8 bg-[#115D5B]">
                <div className="flex flex-wrap items-center gap-x-1 text-[#F3FEFE] w-fit bg-[#296D6B] px-4 py-1 rounded-md">
                  <span className="text-[#F3FEFE]">Calculadora com IA</span>
                </div>
                <h2 className="text-2xl md:text-3xl text-white mt-4 mb-6">
                  Calcule o valor ideal da sua casa ou apartamento
                </h2>
                <p className="text-white/80 mb-8">
                  Compare os preços de imóveis parecidos e acompanhe novidades em um chat simples
                </p>
                <Button className="bg-[#9DC662] hover:bg-[#8AB554] w-fit">
                  Usar calculadora agora
                </Button>
              </div>

              {/* Right Image */}
              <div className="w-1/2 relative">
                <Image
                  src={CALCULATOR_IMAGE}
                  alt="Apartamento moderno"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-x-1 w-fit bg-[#E8F6F6] px-4 py-1 rounded-md">
              <span className="text-sm text-[#0A5351]">Oferecemos serviços em sua área</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-[#0A5351] mt-2">
              Diferenciais pensando em você
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Imóveis selecionados</h3>
              <p className="text-gray-600">
                Milhares de opções para você encontrar seu imóvel perfeito
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Busca assertiva</h3>
              <p className="text-gray-600">
                Encontre exatamente o que você precisa com nossa busca inteligente
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-4xl">💎</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Consultoria 24h por dia</h3>
              <p className="text-gray-600">
                Com nossa assistente inteligente você tem um consultor o tempo todo disponível
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
