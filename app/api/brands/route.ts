import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const brands = await prisma.brand.findMany()
    return NextResponse.json(brands)
  } catch (error) {
    console.error('Ошибка получения брендов:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
