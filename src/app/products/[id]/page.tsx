'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/contexts/AppContext'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import ProductCard from '@/components/product/ProductCard'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Truck, 
  Shield, 
  RotateCcw 
} from 'lucide-react'

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (response.ok) {
          const productData = await response.json()
          setProduct(productData)

          // Buscar produtos relacionados da mesma categoria
          const relatedResponse = await fetch(`/api/products?categoryId=${productData.category.id}`)
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json()
            setRelatedProducts(relatedData.filter((p: Product) => p.id !== productData.id).slice(0, 4))
          }
        } else {
          router.push('/products')
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        router.push('/products')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      if (!state.user) {
        // Se não estiver logado, adicionar ao carrinho local
        const cartItem = {
          id: `local-${product.id}`,
          quantity,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          }
        }
        dispatch({ type: 'ADD_TO_CART', payload: cartItem })
      } else {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: state.user.id,
            productId: product.id,
            quantity
          })
        })

        if (response.ok) {
          const cartItem = await response.json()
          dispatch({ type: 'ADD_TO_CART', payload: cartItem })
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Carregando produto..." />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h2>
          <Link href="/products">
            <Button>Voltar aos produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Início</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Produtos</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/categories/${product.category.id}`} className="text-gray-500 hover:text-gray-700">
              {product.category.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagens do produto */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            {/* Badge de categoria */}
            <div>
              <Link 
                href={`/categories/${product.category.id}`}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {product.category.name}
              </Link>
            </div>

            {/* Nome e avaliação */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.0)</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">23 avaliações</span>
              </div>
            </div>

            {/* Preço */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.featured && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Em destaque
                  </span>
                )}
              </div>
              <p className="text-green-600 text-sm mt-2">
                {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
              </p>
            </div>

            {/* Descrição */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantidade e adicionar ao carrinho */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  isLoading={isAddingToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao carrinho
                </Button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Informações de entrega */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Entrega rápida</p>
                  <p className="text-sm text-gray-600">Receba em até 3 dias úteis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Compra protegida</p>
                  <p className="text-sm text-gray-600">Seus dados estão seguros</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Troca grátis</p>
                  <p className="text-sm text-gray-600">7 dias para trocar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

