import { db, User } from "./db.server"

export const getUsers = ({cursor, take = 20, currentEmail}: {cursor?: User['id'], take?: number, currentEmail: string}) => {
   return db.user.findMany({select: {email: true, id: true, followedBy: true}, ...(cursor && {cursor: {id: cursor}}), take, where: {NOT: {email: currentEmail}}})
} 

type UnpackedPromise<T> = T extends Promise<infer U> ? U : T
export type GetUsers = UnpackedPromise<ReturnType<typeof getUsers>>