'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import Loading from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { ArrowRight, Star, ShoppingBag, Truck, Shield, CreditCard } from 'lucide-react'

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Carregando produtos..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bem-vindo à <span className="text-yellow-400">Top Promo Br</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Descubra os melhores produtos com preços incríveis e promoções exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Explorar Categorias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600 text-sm">Receba seus produtos em até 3 dias úteis</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600 text-sm">Seus dados protegidos com criptografia</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pagamento Fácil</h3>
              <p className="text-gray-600 text-sm">Diversas formas de pagamento disponíveis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600 text-sm">Produtos selecionados com garantia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-blue-600 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Explore Nossas Categorias</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Encontre exatamente o que você procura navegando por nossas categorias organizadas
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category._count.products} produtos
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção especial de produtos com as melhores ofertas
            </p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/products">
                  <Button size="lg">
                    Ver Todos os Produtos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto em destaque encontrado.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Fique por Dentro das Novidades</h2>
            <p className="text-blue-100 mb-8">
              Receba ofertas exclusivas e seja o primeiro a saber sobre nossos lançamentos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
