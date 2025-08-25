import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories/[id] - Buscar categoria por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        products: true,
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Erro ao buscar categoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id] - Atualizar categoria
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description } = body

    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id }
    })

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: name || existingCategory.name,
        description: description || existingCategory.description
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id] - Deletar categoria
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    if (existingCategory._count.products > 0) {
      return NextResponse.json(
        { error: 'Não é possível deletar categoria com produtos associados' },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

