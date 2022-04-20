import { db } from "./db.server"

export const getUsers = async ({currentEmail}: {currentEmail: string}) => {
    return db.user.findMany({select: {email: true, id: true, followedBy: true}, where: {NOT: {email: currentEmail}} })
} 

type UnpackedPromise<T> = T extends Promise<infer U> ? U : T
export type GetUsers = UnpackedPromise<ReturnType<typeof getUsers>>