'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useApp } from '@/contexts/AppContext'
import Button from '@/components/ui/Button'
import { CreditCard, MapPin, User, Mail, Phone, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '',
    
    // Endereço
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Pagamento
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })

  useEffect(() => {
    // Redirecionar se não estiver logado ou carrinho vazio
    if (!state.user) {
      router.push('/login?redirect=/checkout')
      return
    }
    
    if (state.cart.length === 0) {
      router.push('/cart')
      return
    }
  }, [state.user, state.cart, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simular processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Criar pedido
      const orderData = {
        userId: state.user?.id,
        items: state.cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        const order = await response.json()
        
        // Limpar carrinho
        dispatch({ type: 'CLEAR_CART' })
        
        // Redirecionar para página de sucesso
        router.push(`/order-success?orderId=${order.id}`)
      } else {
        throw new Error('Erro ao processar pedido')
      }
    } catch (error) {
      console.error('Erro no checkout:', error)
      alert('Erro ao processar pedido. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (!state.user || state.cart.length === 0) {
    return null // Será redirecionado
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados pessoais */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dados pessoais
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço de entrega */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Endereço de entrega
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="00000-000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        {/* Adicionar outros estados */}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Rua, avenida, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        name="number"
                        required
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complement"
                        value={formData.complement}
                        onChange={handleChange}
                        placeholder="Apto, bloco, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        required
                        value={formData.neighborhood}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pagamento
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Forma de pagamento
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={formData.paymentMethod === 'credit'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Cartão de crédito
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="debit"
                            checked={formData.paymentMethod === 'debit'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          Cartão de débito
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="pix"
                            checked={formData.paymentMethod === 'pix'}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          PIX
                        </label>
                      </div>
                    </div>

                    {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número do cartão
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome no cartão
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            required
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Validade
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            required
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cardCvv"
                            required
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  {isProcessing ? 'Processando...' : 'Finalizar compra'}
                </Button>
              </form>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumo do pedido
                </h2>

                {/* Itens */}
                <div className="space-y-4 mb-6">
                  {state.cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totais */}
                <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(state.cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(state.cartTotal)}</span>
                  </div>
                </div>

                {/* Segurança */}
                <div className="text-center text-sm text-gray-600">
                  <p className="mb-2">🔒 Pagamento 100% seguro</p>
                  <p>Seus dados estão protegidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

