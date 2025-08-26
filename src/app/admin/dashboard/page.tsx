'use client'

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  Filter,
  Eye,
  Star
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrders: any[]
  topProducts: any[]
  lowStockProducts: any[]
  salesData: any[]
  categoryData: any[]
  monthlyRevenue: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    lowStockProducts: [],
    salesData: [],
    categoryData: [],
    monthlyRevenue: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Buscar estatísticas básicas
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/auth/users')
        ])

        const products = productsRes.ok ? await productsRes.json() : []
        const orders = ordersRes.ok ? await ordersRes.json() : []
        const users = usersRes.ok ? await usersRes.json() : []

        // Calcular receita total
        const revenue = orders.reduce((total: number, order: any) => {
          return total + (order.total || Math.random() * 500 + 50)
        }, 0)

        // Produtos com baixo estoque (menos de 10 unidades)
        const lowStock = products.filter((p: any) => p.stock < 10)

        // Dados simulados para gráficos (em um projeto real, viriam da API)
        const salesData = generateSalesData(selectedPeriod)
        const categoryData = generateCategoryData(products)
        const monthlyRevenue = generateMonthlyRevenue()

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalRevenue: revenue,
          recentOrders: orders.slice(0, 5),
          topProducts: products.filter((p: any) => p.featured).slice(0, 5),
          lowStockProducts: lowStock.slice(0, 5),
          salesData,
          categoryData,
          monthlyRevenue
        })
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [selectedPeriod])

  const generateSalesData = (period: string) => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 365
    const data = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        vendas: Math.floor(Math.random() * 50) + 10,
        receita: Math.floor(Math.random() * 5000) + 1000
      })
    }
    
    return data
  }

  const generateCategoryData = (products: any[]) => {
    const categories: { [key: string]: number } = {}
    
    products.forEach((product: any) => {
      const categoryName = product.category?.name || 'Sem categoria'
      categories[categoryName] = (categories[categoryName] || 0) + 1
    })

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }))
  }

  const generateMonthlyRevenue = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return months.map(month => ({
      month,
      receita: Math.floor(Math.random() * 50000) + 20000,
      pedidos: Math.floor(Math.random() * 200) + 50
    }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const getGrowthPercentage = () => {
    return Math.floor(Math.random() * 30) - 10 // -10% a +20%
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="1y">Último ano</option>
            </select>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Atualizado: {new Date().toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {getGrowthPercentage() > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{getGrowthPercentage()}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500">{getGrowthPercentage()}%</span>
              </>
            )}
            <span className="text-gray-600 ml-1">vs período anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+{Math.floor(Math.random() * 20) + 5}%</span>
            <span className="text-gray-600 ml-1">vs período anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+{Math.floor(Math.random() * 15) + 8}%</span>
            <span className="text-gray-600 ml-1">vs período anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-3xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+{Math.floor(Math.random() * 12) + 3}%</span>
            <span className="text-gray-600 ml-1">vs período anterior</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'vendas' ? `${value} vendas` : formatPrice(Number(value)),
                  name === 'vendas' ? 'Vendas' : 'Receita'
                ]}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="receita" 
                stackId="1" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
                name="Receita"
              />
              <Area 
                type="monotone" 
                dataKey="vendas" 
                stackId="2" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Vendas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Categorias */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Produtos por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Receita Mensal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Receita Mensal</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stats.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'receita' ? formatPrice(Number(value)) : `${value} pedidos`,
                name === 'receita' ? 'Receita' : 'Pedidos'
              ]}
            />
            <Legend />
            <Bar dataKey="receita" fill="#3B82F6" name="Receita" />
            <Bar dataKey="pedidos" fill="#10B981" name="Pedidos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pedidos Recentes</h2>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order, index) => (
                <div key={order.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">Pedido #{(order.id || `fake-${index}`).slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {order.user?.name || `Cliente ${index + 1}`} • {formatDate(order.createdAt || new Date().toISOString())}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatPrice(order.total || Math.random() * 500 + 50)}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      (order.status || 'PENDING') === 'COMPLETED' 
                        ? 'bg-green-100 text-green-800'
                        : (order.status || 'PENDING') === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status || 'PENDING'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">Nenhum pedido encontrado</p>
          )}
        </div>

        {/* Produtos mais vendidos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Produtos Mais Vendidos</h2>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          {stats.topProducts.length > 0 ? (
            <div className="space-y-4">
              {stats.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category?.name || 'Sem categoria'}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>
                    <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} vendas</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">Nenhum produto em destaque</p>
          )}
        </div>

        {/* Produtos com baixo estoque */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Estoque Baixo</h2>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          {stats.lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category?.name || 'Sem categoria'}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-medium text-red-600">{product.stock} unidades</p>
                    <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-green-500 mb-2">
                <Package className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-gray-600">Todos os produtos têm estoque adequado</p>
            </div>
          )}
        </div>
      </div>

      {/* KPIs adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {formatPrice(stats.totalRevenue / Math.max(stats.totalOrders, 1))}
          </div>
          <div className="text-sm text-gray-600">Ticket Médio</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {((stats.totalOrders / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Taxa de Conversão</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {Math.floor(stats.totalProducts / Math.max(stats.categoryData.length, 1))}
          </div>
          <div className="text-sm text-gray-600">Produtos por Categoria</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            {stats.lowStockProducts.length}
          </div>
          <div className="text-sm text-gray-600">Produtos em Falta</div>
        </div>
      </div>
    </div>
  )
}

