'use client'

import React from 'react'
import Image from 'next/image'
import { Users, Target, Eye, Heart, Award, ShoppingBag, Clock, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre a Top Promo Br
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Sua loja online de confiança com os melhores produtos e promoções do Brasil
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Fundada em 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>+50.000 clientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Nossa História
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    A Top Promo Br nasceu em 2020 com um sonho simples: democratizar o acesso a produtos de qualidade 
                    com preços justos para todos os brasileiros. Fundada por uma equipe apaixonada por tecnologia e 
                    comércio eletrônico, começamos como uma pequena startup em São Paulo.
                  </p>
                  <p>
                    Desde o início, nossa missão foi clara: oferecer uma experiência de compra online excepcional, 
                    combinando variedade de produtos, preços competitivos e um atendimento ao cliente de primeira classe. 
                    Acreditamos que cada brasileiro merece ter acesso aos melhores produtos do mercado.
                  </p>
                  <p>
                    Hoje, após anos de crescimento constante, atendemos mais de 50.000 clientes em todo o país, 
                    oferecendo milhares de produtos das melhores marcas nacionais e internacionais. Nossa jornada 
                    é marcada pela inovação, qualidade e, principalmente, pela confiança que nossos clientes depositam em nós.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                      <div className="text-gray-600">Clientes Satisfeitos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                      <div className="text-gray-600">Produtos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
                      <div className="text-gray-600">Satisfação</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                      <div className="text-gray-600">Suporte</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Nossos Pilares
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Missão */}
              <div className="text-center p-8 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Democratizar o acesso a produtos de qualidade, oferecendo uma experiência de compra online 
                  excepcional com preços justos, entrega rápida e atendimento personalizado para todos os brasileiros.
                </p>
              </div>

              {/* Visão */}
              <div className="text-center p-8 rounded-2xl bg-green-50 border border-green-100">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ser a plataforma de e-commerce mais confiável e inovadora do Brasil, reconhecida pela excelência 
                  no atendimento, variedade de produtos e compromisso com a satisfação do cliente.
                </p>
              </div>

              {/* Valores */}
              <div className="text-center p-8 rounded-2xl bg-purple-50 border border-purple-100">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                <p className="text-gray-700 leading-relaxed">
                  Transparência, qualidade, inovação, respeito ao cliente, responsabilidade social e compromisso 
                  com a excelência em todos os aspectos do nosso negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Por que escolher a Top Promo Br?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Variedade</h3>
                <p className="text-gray-600 text-sm">
                  Mais de 10.000 produtos das melhores marcas nacionais e internacionais
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualidade</h3>
                <p className="text-gray-600 text-sm">
                  Produtos selecionados com rigoroso controle de qualidade
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Agilidade</h3>
                <p className="text-gray-600 text-sm">
                  Entrega rápida e segura para todo o Brasil
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte</h3>
                <p className="text-gray-600 text-sm">
                  Atendimento especializado 24/7 para ajudar você
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compromisso com o Cliente */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Nosso Compromisso com Você
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Na Top Promo Br, cada cliente é único e especial. Trabalhamos incansavelmente para superar suas 
              expectativas, oferecendo não apenas produtos de qualidade, mas uma experiência completa de compra 
              que vai desde a navegação no site até o pós-venda.
            </p>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Promessa</h3>
              <p className="text-gray-700 leading-relaxed">
                Garantimos produtos originais, preços justos, entrega no prazo, atendimento humanizado e 
                total transparência em todas as nossas operações. Sua satisfação é nossa maior conquista.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Fale Conosco
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Estamos sempre prontos para ajudar você. Entre em contato conosco!
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Endereço</h3>
                <p className="opacity-90">São Paulo, SP - Brasil</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Telefone</h3>
                <p className="opacity-90">(11) 9999-9999</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">E-mail</h3>
                <p className="opacity-90">contato@toppromo.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

