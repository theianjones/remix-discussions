import {PrismaClient} from '@prisma/client'
export type {Post, User, Follows} from '@prisma/client'

export const db = new PrismaClient()
