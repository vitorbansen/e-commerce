import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/cart - Buscar itens do carrinho
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      )
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)

    return NextResponse.json({
      items: cartItems,
      total,
      count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    })
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Adicionar item ao carrinho
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId, quantity = 1 } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'ID do usuário e do produto são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o produto existe
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se já existe no carrinho
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    })

    let cartItem

    if (existingCartItem) {
      // Atualizar quantidade
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity
        },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      })
    } else {
      // Criar novo item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity
        },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      })
    }

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

