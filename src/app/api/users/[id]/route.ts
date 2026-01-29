import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

// GET /api/users/[id] - Buscar usuário por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json({ error: 'Erro ao buscar usuário' }, { status: 500 })
  }
}

// PUT /api/users/[id] - Atualizar usuário
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { email, name } = body

    const user = await prisma.user.update({
      where: {
        id: params.id
      },
      data: {
        email,
        name
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Deletar usuário
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 })
  }
}
