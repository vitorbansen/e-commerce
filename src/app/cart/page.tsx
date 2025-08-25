'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useApp } from '@/contexts/AppContext'
import Button from '@/components/ui/Button'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(itemId)
    try {
      if (state.user && !itemId.startsWith('local-')) {
        // Atualizar no servidor
        const response = await fetch(`/api/cart/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity })
        })

        if (response.ok) {
          dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity: newQuantity } })
        }
      } else {
        // Atualizar localmente
        dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity: newQuantity } })
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)
    try {
      if (state.user && !itemId.startsWith('local-')) {
        // Remover do servidor
        const response = await fetch(`/api/cart/${itemId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
        }
      } else {
        // Remover localmente
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
      }
    } catch (error) {
      console.error('Erro ao remover item:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleCheckout = () => {
    if (!state.user) {
      router.push('/login?redirect=/checkout')
    } else {
      router.push('/checkout')
    }
  }

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione alguns produtos incríveis ao seu carrinho e volte aqui para finalizar sua compra.
            </p>
            <Link href="/products">
              <Button size="lg">
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continuar comprando
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Carrinho de compras</h1>
          <p className="text-gray-600 mt-2">
            {state.cartCount} {state.cartCount === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Imagem do produto */}
                  <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Sem imagem</span>
                      </div>
                    )}
                  </div>

                  {/* Informações do produto */}
                  <div className="flex-1 text-black">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          <Link 
                            href={`/products/${item.product.id}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.category.name}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Controles de quantidade */}
                      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isUpdating === item.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal do item */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Resumo do pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.cartCount} itens)</span>
                  <span className="font-medium">{formatPrice(state.cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(state.cartTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Finalizar compra
              </Button>

              {!state.user && (
                <p className="text-sm text-gray-600 text-center mt-4">
                  <Link href="/login" className="text-blue-600 hover:text-blue-500">
                    Faça login
                  </Link>{' '}
                  para salvar seu carrinho
                </p>
              )}

              {/* Informações de segurança */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Compra 100% segura</p>
                  <div className="flex justify-center space-x-2">
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">SSL</div>
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs">256-bit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

