import type {ActionFunction} from 'remix'
import {authenticator, USER_LOGIN} from '~/services/auth.server'

export const action: ActionFunction = async ({request}) => {
  return authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: '/posts',
    failureRedirect: '/login',
  })
}

export default function LoginPage() {
  return (
    <form method="post">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}
