import type {ActionFunction} from 'remix'
import {redirect} from 'remix'
import {userSignup, USER_LOGIN} from '~/services/auth.server'
import {Signup} from '~/services/validations'

export const action: ActionFunction = async ({request}) => {
  const form = await request.formData()
  const rawEmail = form.get('email')
  const rawPassword = form.get('password')
  const {email, password} = Signup.parse({
    email: rawEmail,
    password: rawPassword,
  })

  const user = await userSignup(email, password)
  if (user) {
    return redirect('/login')
  } else {
    return {}
  }
}

export default function SignupPage() {
  return (
    <form method="post">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Create Account</button>
    </form>
  )
}
