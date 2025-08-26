'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useApp } from '@/contexts/AppContext'
import { ShoppingCart, Heart, Star } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!state.user) {
      // Se não estiver logado, adicionar ao carrinho local
      const cartItem = {
        id: `local-${product.id}`,
        quantity: 1,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        }
      }
      dispatch({ type: 'ADD_TO_CART', payload: cartItem })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: state.user.id,
          productId: product.id,
          quantity: 1
        })
      })

      if (response.ok) {
        const cartItem = await response.json()
        dispatch({ type: 'ADD_TO_CART', payload: cartItem })
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sem imagem</span>
            </div>
          )}

          {/* Badge de Destaque */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Destaque
            </div>
          )}

          {/* Botão de Favorito */}
          <button
            type="button"
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col space-y-3">
        <Link href={`/products/${product.id}`}>
          <div>
            <span className="text-xs text-blue-600 font-medium">{product.category.name}</span>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.stock > 0 ? (
                  <span className="text-xs text-green-600">Em estoque</span>
                ) : (
                  <span className="text-xs text-red-600">Fora de estoque</span>
                )}
              </div>
              {/* Rating (placeholder) */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.0)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Botão de Adicionar fora do Link */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{isLoading ? 'Adicionando...' : 'Adicionar ao carrinho'}</span>
        </button>
      </div>
    </div>
  )
}
