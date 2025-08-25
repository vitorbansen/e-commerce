'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface User {
  id: string
  email: string
  name?: string
  isAdmin: boolean
}

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image?: string
    category: {
      id: string
      name: string
    }
  }
}

interface AppState {
  user: User | null
  cart: CartItem[]
  cartTotal: number
  cartCount: number
  isLoading: boolean
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }

const initialState: AppState = {
  user: null,
  cart: [],
  cartTotal: 0,
  cartCount: 0,
  isLoading: false
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_CART':
      const total = action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const count = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, cart: action.payload, cartTotal: total, cartCount: count }
    
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.product.id === action.payload.product.id)
      let newCart: CartItem[]
      
      if (existingItemIndex >= 0) {
        newCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newCart = [...state.cart, action.payload]
      }
      
      const newTotal = newCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const newCount = newCart.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, cart: newCart, cartTotal: newTotal, cartCount: newCount }
    
    case 'UPDATE_CART_ITEM':
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      const updatedTotal = updatedCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const updatedCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, cart: updatedCart, cartTotal: updatedTotal, cartCount: updatedCount }
    
    case 'REMOVE_FROM_CART':
      const filteredCart = state.cart.filter(item => item.id !== action.payload)
      const filteredTotal = filteredCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      const filteredCount = filteredCart.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, cart: filteredCart, cartTotal: filteredTotal, cartCount: filteredCount }
    
    case 'CLEAR_CART':
      return { ...state, cart: [], cartTotal: 0, cartCount: 0 }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) })
    }

    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) })
    }
  }, [])

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('user')
    }
  }, [state.user])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider')
  }
  return context
}

