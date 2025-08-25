import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Buscar produto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Atualizar produto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, price, image, stock, featured, categoryId } = body

    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price ? parseFloat(price) : existingProduct.price,
        image: image || existingProduct.image,
        stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
        featured: featured !== undefined ? Boolean(featured) : existingProduct.featured,
        categoryId: categoryId || existingProduct.categoryId
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Deletar produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

