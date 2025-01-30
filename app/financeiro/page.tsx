'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/header'
import { ChevronRight, Building2, Home, Bed, Bath, Car } from 'lucide-react'

export default function FinanceiroPage() {
  const [formData, setFormData] = useState({
    valorImovel: '',
    entrada: '',
    taxaJuros: '',
    prazo: '',
    valorParcela: '',
    dataMudanca: '',
    ajudaEntrada: false,
    ajudaParcela: false,
    ajudaEntradaValor: '',
    ajudaParcelaValor: '',
  })

  const [cenarioPositivo, setCenarioPositivo] = useState(true)

  const bancos = [
    { nome: 'Banco A', taxa: 8.5, parcela: 3200, aprovado: 450000 },
    { nome: 'Banco B', taxa: 9.2, parcela: 3400, aprovado: 420000 },
    { nome: 'Banco C', taxa: 7.8, parcela: 3100, aprovado: 480000 },
  ]

  const valorAprovado = 450000
  const valorNecessario = 600000
  const percentualAlcancado = (valorAprovado / valorNecessario) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 pt-12">
        {/* Seção 1: Calculadora */}
        <section className="container mx-auto mb-12 px-4">
          <h2 className="mb-6 text-2xl font-semibold">Simulador de Financiamento</h2>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-sm text-gray-600">Valor do Imóvel</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="R$ 500.000,00"
                  value={formData.valorImovel}
                  onChange={(e) => setFormData({ ...formData, valorImovel: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-600">Valor da Entrada</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="R$ 100.000,00"
                  value={formData.entrada}
                  onChange={(e) => setFormData({ ...formData, entrada: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-600">Taxa de Juros Desejada</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="8,5%"
                  value={formData.taxaJuros}
                  onChange={(e) => setFormData({ ...formData, taxaJuros: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-600">Prazo do Financiamento</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="360 meses"
                  value={formData.prazo}
                  onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-600">Valor da Parcela Desejada</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="R$ 3.000,00"
                  value={formData.valorParcela}
                  onChange={(e) => setFormData({ ...formData, valorParcela: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-600">Quando Deseja se Mudar?</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="Em 6 meses"
                  value={formData.dataMudanca}
                  onChange={(e) => setFormData({ ...formData, dataMudanca: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Opcionais */}
        <section className="container mx-auto mb-12 px-4">
          <h2 className="mb-6 text-2xl font-semibold">Ajuda Adicional</h2>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="size-5 rounded focus:ring-2 focus:ring-green-500 text-green-500"
                    checked={formData.ajudaEntrada}
                    onChange={(e) => setFormData({ ...formData, ajudaEntrada: e.target.checked })}
                  />
                  <span className="text-gray-600">Terei ajuda para dar entrada</span>
                </label>
                {formData.ajudaEntrada && (
                  <input
                    type="text"
                    className="mt-3 w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="Valor da ajuda"
                    value={formData.ajudaEntradaValor}
                    onChange={(e) => setFormData({ ...formData, ajudaEntradaValor: e.target.value })}
                  />
                )}
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="size-5 rounded focus:ring-2 focus:ring-green-500 text-green-500"
                    checked={formData.ajudaParcela}
                    onChange={(e) => setFormData({ ...formData, ajudaParcela: e.target.checked })}
                  />
                  <span className="text-gray-600">Terei ajuda para pagar as parcelas</span>
                </label>
                {formData.ajudaParcela && (
                  <input
                    type="text"
                    className="mt-3 w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    placeholder="Valor da ajuda mensal"
                    value={formData.ajudaParcelaValor}
                    onChange={(e) => setFormData({ ...formData, ajudaParcelaValor: e.target.value })}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3: Resultados */}
        <section className="container mx-auto mb-12 px-4">
          <h2 className="mb-6 text-2xl font-semibold">Opções de Financiamento</h2>
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Banco</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Taxa de Juros</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Parcela</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Valor Aprovado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bancos.map((banco, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{banco.nome}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{banco.taxa}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">R$ {banco.parcela}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">R$ {banco.aprovado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Toggle de Cenários */}
        <section className="container mx-auto mb-6 px-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  !cenarioPositivo
                    ? 'bg-red-50 text-red-600'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setCenarioPositivo(false)}
              >
                Cenário Negativo
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  cenarioPositivo
                    ? 'bg-green-50 text-green-600'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setCenarioPositivo(true)}
              >
                Cenário Positivo
              </button>
            </div>
          </div>
        </section>

        {/* Seção 4 ou 5 (dependendo do cenário) */}
        {!cenarioPositivo ? (
          <section className="container mx-auto mb-12 px-4">
            <div className="rounded-xl p-8 bg-red-50">
              <h2 className="mb-4 text-2xl font-semibold">Análise do Financiamento</h2>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progresso para realizar seu sonho</span>
                  <span>{Math.round(percentualAlcancado)}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${percentualAlcancado}%` }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">Para alcançar 100% do valor necessário, você pode:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Aumentar o valor da entrada</li>
                  <li>Buscar uma renda complementar</li>
                  <li>Considerar imóveis em outras regiões</li>
                  <li>Avaliar um prazo maior de financiamento</li>
                </ul>
              </div>
            </div>
          </section>
        ) : (
          <section className="container mx-auto px-4">
            <div className="rounded-xl p-8 bg-green-50">
              <h2 className="mb-6 text-2xl font-semibold">Encontre seu Imóvel Ideal</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="mb-2 block text-sm text-gray-600">Quartos</label>
                  <select className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500">
                    <option>2 quartos</option>
                    <option>3 quartos</option>
                    <option>4 ou mais quartos</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-600">Banheiros</label>
                  <select className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500">
                    <option>1 banheiro</option>
                    <option>2 banheiros</option>
                    <option>3 ou mais banheiros</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-600">Vagas de Garagem</label>
                  <select className="w-full bg-gray-50 rounded-lg border text-gray-900 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500">
                    <option>1 vaga</option>
                    <option>2 vagas</option>
                    <option>3 ou mais vagas</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-2 block text-sm text-gray-600">Facilidades</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white">
                    <input 
                      type="checkbox" 
                      className="size-5 rounded text-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm">Piscina</span>
                  </label>
                  <label className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white">
                    <input 
                      type="checkbox" 
                      className="size-5 rounded text-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm">Academia</span>
                  </label>
                  <label className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white">
                    <input 
                      type="checkbox" 
                      className="size-5 rounded text-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm">Churrasqueira</span>
                  </label>
                  <label className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white">
                    <input 
                      type="checkbox" 
                      className="size-5 rounded text-green-500 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm">Área de Lazer</span>
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Link 
                  href="/imoveis" 
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                  Ver Imóveis Disponíveis
                  <ChevronRight className="size-5" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
