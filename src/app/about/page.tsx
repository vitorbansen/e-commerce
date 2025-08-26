'use client'

import React from 'react'
import { Users, Target, Eye, Heart, Award, ShoppingBag, Clock, MapPin, Phone, Mail, Star, Zap, Shield, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20"></div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm mb-8">
              <Star className="h-4 w-4 mr-2 text-yellow-400" />
              Loja online de confiança desde 2020
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Top Promo
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Br</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Conectamos você aos melhores produtos com tecnologia, confiança e preços que cabem no seu bolso
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/70 text-sm">Clientes Ativos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/70 text-sm">Produtos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl font-bold text-white mb-1">99%</div>
                <div className="text-white/70 text-sm">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full mb-6">
                  Nossa Jornada
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Uma história de 
                  <span className="text-purple-600"> inovação</span> e confiança
                </h2>
                
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Nascemos em 2020 com uma visão ousada: transformar a experiência de compra online no Brasil. 
                    O que começou como uma startup em São Paulo hoje conecta milhares de famílias aos produtos que elas amam.
                  </p>
                  <p>
                    Nossa paixão pela tecnologia e dedicação ao atendimento humanizado nos levaram muito além do que imaginávamos. 
                    Cada cliente satisfeito fortalece nossa missão de democratizar o acesso a produtos de qualidade.
                  </p>
                  <p>
                    Hoje, somos mais que uma loja online - somos uma ponte entre seus sonhos e as melhores oportunidades do mercado.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">4 anos</div>
                    <div className="text-gray-600 text-sm">de experiência</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                    <div className="text-gray-600 text-sm">suporte ativo</div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 transform rotate-3">
                    <div className="bg-white rounded-2xl p-8 transform -rotate-3 shadow-xl">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
                          <div className="text-gray-600 text-sm">Clientes</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
                          <div className="text-gray-600 text-sm">Satisfação</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <ShoppingBag className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                          <div className="text-gray-600 text-sm">Produtos</div>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                            <Zap className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold text-gray-900 mb-2">24h</div>
                          <div className="text-gray-600 text-sm">Entrega</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
                Nossos Valores
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                O que nos move todos os dias
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossos princípios guiam cada decisão e nos conectam com o propósito de transformar vidas
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Democratizar o acesso a produtos de qualidade através de uma plataforma intuitiva, 
                    preços justos e um atendimento que faz a diferença na vida de cada cliente.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ser a plataforma de e-commerce mais inovadora e confiável do Brasil, 
                    reconhecida por revolucionar a experiência de compra online.
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transparência total, inovação constante, excelência no atendimento e 
                    responsabilidade social em cada ação que tomamos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-6">
                Nossos Diferenciais
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Por que somos diferentes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada detalhe foi pensado para proporcionar a melhor experiência de compra
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Variedade Única</h3>
                <p className="text-gray-600">
                  Catálogo curado com mais de 10.000 produtos das melhores marcas do mundo
                </p>
              </div>

              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Qualidade Garantida</h3>
                <p className="text-gray-600">
                  Controle rigoroso de qualidade e garantia total em todos os produtos
                </p>
              </div>

              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Entrega Expressa</h3>
                <p className="text-gray-600">
                  Logística inteligente com entrega rápida e rastreamento em tempo real
                </p>
              </div>

              <div className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte Premium</h3>
                <p className="text-gray-600">
                  Equipe especializada disponível 24/7 para resolver qualquer dúvida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compromisso */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full mb-6">
                Nosso Compromisso
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Sua satisfação é nossa <span className="text-purple-600">prioridade</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Cada detalhe da sua experiência conosco é pensado com carinho. Desde a primeira visita ao nosso site 
                até o pós-venda, estamos aqui para superar suas expectativas.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Promessa</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Produtos 100% originais e verificados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Preços justos e competitivos sempre</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Entrega no prazo ou seu dinheiro de volta</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Atendimento humanizado e especializado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Transparência total em nossas operações</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Compromisso com sua completa satisfação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}