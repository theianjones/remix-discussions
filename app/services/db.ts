import {PrismaClient} from '@prisma/client'
export type {Post, User} from '@prisma/client'

export const db = new PrismaClient()
