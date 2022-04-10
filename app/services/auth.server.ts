import {Authenticator} from 'remix-auth'
import {FormStrategy} from 'remix-auth-form'
import {sessionStorage} from '~/services/session.server'
import type {User} from '~/services/db.server'
import {db} from '~/services/db.server'
import {Login} from './validations'
import {hashPassword, verifyPassword} from './auth-utils.server'

export type SessionUser = Omit<User, 'hashedPassword'>
export let authenticator = new Authenticator<SessionUser>(sessionStorage)
const sessionUserSelect = {
  email: true,
  createdAt: true,
  id: true,
  name: true,
  role: true,
  updatedAt: true,
}

export const userSignup = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
    },
    select: sessionUserSelect,
  })
  return user
}

const userLogin = async (email: string, password: string) => {
  const user = await db.user.findFirst({where: {email}})
  console.log({user})
  if (!user) {
    throw new Error('Cant find that user :(')
  }

  const isAuthenticated = await verifyPassword(user.hashedPassword, password)

  console.log({isAuthenticated})
  if (!isAuthenticated) {
    throw new Error('Password was incorrect')
  }

  const {hashedPassword, ...sessionUser} = user

  console.log({sessionUser})
  return sessionUser
}

export const USER_LOGIN = 'user-login'
authenticator.use(
  new FormStrategy(async ({form, context}) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    let rawEmail = form.get('email') // or email... etc
    let rawPassword = form.get('password')

    let {email, password} = Login.parse({
      email: rawEmail,
      password: rawPassword,
    })

    const user = await userLogin(email, password)

    console.log({login: user})
    return user
  }),
  USER_LOGIN,
)
