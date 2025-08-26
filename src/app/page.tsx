'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import Loading from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { ArrowRight, Star, ShoppingBag, Truck, Shield, CreditCard, Sparkles, Mail, Users, Award, Zap, Heart } from 'lucide-react'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  stock: number
  featured: boolean
  category: {
    id: string
    name: string
  }
}

interface Category {
  id: string
  name: string
  description?: string
  _count: {
    products: number
  }
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar produtos em destaque
        const productsResponse = await fetch('/api/products?featured=true')
        if (productsResponse.ok) {
          const products = await productsResponse.json()
          setFeaturedProducts(products.slice(0, 8)) // Limitar a 8 produtos
        }

        // Buscar categorias
        const categoriesResponse = await fetch('/api/categories')
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de inscrição
    console.log('Email inscrito:', email)
    setEmail('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl mb-6 animate-pulse">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <div className="text-white/80">
            <Loading size="lg" text="Carregando sua experiência premium..." />
          </div>
        </div>
      </div>
    )
  }

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
              <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
              Ofertas exclusivas disponíveis agora
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Bem-vindo à
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Top Promo Br</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Descubra os melhores produtos com preços incríveis, qualidade garantida e a confiança de mais de 50 mil clientes satisfeitos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Ver Produtos
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  Explorar Categorias
                </Button>
              </Link>
            </div>

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

      {/* Diferenciais */}
      <section className="py-20 lg:py-28 -mt-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Truck, 
                title: 'Entrega Express', 
                desc: 'Receba em até 24h em todo Brasil', 
                gradient: 'from-blue-500 to-blue-600' 
              },
              { 
                icon: Shield, 
                title: 'Compra Protegida', 
                desc: 'Segurança total em todas as transações', 
                gradient: 'from-green-500 to-green-600' 
              },
              { 
                icon: CreditCard, 
                title: 'Pagamento Flexível', 
                desc: 'Parcele em até 12x sem juros', 
                gradient: 'from-purple-500 to-purple-600' 
              },
              { 
                icon: Award, 
                title: 'Qualidade Premium', 
                desc: 'Produtos selecionados e garantidos', 
                gradient: 'from-orange-500 to-orange-600' 
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Organize sua busca
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Explore Nossas Categorias
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Encontre exatamente o que procura navegando por nossas categorias cuidadosamente organizadas
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      'bg-gradient-to-br from-orange-500 to-orange-600'
                    } group-hover:scale-110 shadow-lg`}>
                      <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center font-medium">
                      {category._count.products} produtos disponíveis
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full mb-6">
                <Star className="h-4 w-4 mr-2" />
                Seleção Especial
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Produtos em <span className="text-purple-600">Destaque</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossa curadoria especial com os produtos mais procurados e bem avaliados pelos nossos clientes
              </p>
            </div>
            
            {featuredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                <div className="text-center">
                  <Link href="/products">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Ver Todos os Produtos
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Novos produtos chegando em breve</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Estamos preparando uma seleção incrível de produtos especialmente para você!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full mb-6">
                <Mail className="h-4 w-4 mr-2" />
                Newsletter Exclusiva
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Fique por Dentro das <span className="text-purple-600">Novidades</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Seja o primeiro a saber sobre ofertas exclusivas, lançamentos e promoções especiais. 
                Receba conteúdo selecionado diretamente no seu e-mail.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Inscreva-se Gratuitamente</h3>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail"
                    className="flex-1 px-6 py-4 rounded-2xl text-gray-900 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent font-medium placeholder-gray-500 transition-all duration-300"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Inscrever-se
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Ofertas exclusivas semanais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Pré-lançamentos e novidades</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Dicas e tendências</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>100% sem spam, cancele quando quiser</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}