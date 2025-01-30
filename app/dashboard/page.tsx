'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '../../components/layout/header'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, MessageSquare, TrendingUp, Gift, Link } from 'lucide-react'

const valorizacaoData = [
  { mes: 'Jan', valor: 500000 },
  { mes: 'Fev', valor: 505000 },
  { mes: 'Mar', valor: 508000 },
  { mes: 'Abr', valor: 515000 },
  { mes: 'Mai', valor: 520000 },
  { mes: 'Jun', valor: 528000 },
]

export default function DashboardPage() {
  const [statusCompra, setStatusCompra] = useState({
    percentualConcluido: 75,
    proximaEtapa: 'Assinatura do Contrato',
    dataProximaEtapa: '15/02/2025',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Seção 1: Status da Compra */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">Status da Compra</h2>
          <div className="mb-4">
            <div className="mb-2 flex justify-between text-sm text-gray-600">
              <span>Progresso</span>
              <span>{statusCompra.percentualConcluido}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${statusCompra.percentualConcluido}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <Calendar className="size-5 text-green-500" />
            <div>
              <p>Próxima etapa: {statusCompra.proximaEtapa}</p>
              <p className="text-sm">Data: {statusCompra.dataProximaEtapa}</p>
            </div>
          </div>
        </section>

        {/* Seção 2: Pedir Assistência */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">Precisa de Ajuda?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <button className="flex items-center justify-center gap-3 rounded-lg bg-green-50 px-6 py-4 transition-colors hover:bg-green-100">
              <MessageSquare className="size-6 text-green-600" />
              <span className="font-medium text-green-700">Falar com Consultor</span>
            </button>
            <button className="flex items-center justify-center gap-3 rounded-lg bg-green-50 px-6 py-4 transition-colors hover:bg-green-100">
              <Calendar className="size-6 text-green-600" />
              <span className="font-medium text-green-700">Agendar Visita</span>
            </button>
          </div>
        </section>

        {/* Seção 3: Valorização do Investimento */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="size-6 text-green-500" />
            <h2 className="text-2xl font-semibold">Valorização do Investimento</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valorizacaoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Seção 4: Experiência Surpresa */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="size-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Nossa Equipe está a Caminho! 🎉</h2>
            </div>
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-600">
                Prepare-se para uma experiência incrível! No dia 10/02/2025, nossa equipe fará uma visita especial para te apresentar algo extraordinário! ✨
              </p>
              <p className="text-gray-600">
                Mal podemos esperar para compartilhar essa surpresa com você! 🎁
              </p>
            </div>
            <div className="relative h-64">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Equipe feliz"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
