import {PrismaClient} from '@prisma/client'
export type {Post} from '@prisma/client'

export const db = new PrismaClient()
