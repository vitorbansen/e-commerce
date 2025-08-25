import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/cart/[id] - Atualizar quantidade do item no carrinho
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { quantity } = body

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Quantidade deve ser maior que 0' },
        { status: 400 }
      )
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: { id: params.id }
    })

    if (!existingCartItem) {
      return NextResponse.json(
        { error: 'Item do carrinho não encontrado' },
        { status: 404 }
      )
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity: parseInt(quantity) },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Erro ao atualizar item do carrinho:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart/[id] - Remover item do carrinho
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingCartItem = await prisma.cartItem.findUnique({
      where: { id: params.id }
    })

    if (!existingCartItem) {
      return NextResponse.json(
        { error: 'Item do carrinho não encontrado' },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Item removido do carrinho' })
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

