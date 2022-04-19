import {ActionFunction, LinksFunction, LoaderFunction, useTransition} from 'remix'
import {Form, json, useLoaderData} from 'remix'
import {authenticator, USER_LOGIN} from '~/services/auth.server'
import {getSession} from '~/services/session.server'
import styles from '~/styles/login.css'

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet',
      href: styles}
  ]
}

export const action: ActionFunction = async ({request}) => {
  return authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: '/posts',
    throwOnError: true,
    failureRedirect: '/login',
  })
}

export let loader: LoaderFunction = async ({request}) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/posts',
  })
  let session = await getSession(request.headers.get('cookie'))
  let error = session.get(authenticator.sessionErrorKey) as Error[] | Error
  return json({error})
}

export default function LoginPage() {
  const {error} = useLoaderData<{error: Error}>()
  const transition = useTransition()
  return (
    <div className='login'>
      <h1>Login</h1>
      <Form method="post" className='form'>
        <div className='field'>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="user-name" required />
        </div>
        <div className='field'>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          />
          </div>
        <button
          type="submit"
          disabled={transition.state !== 'idle'}
          className="button"
        >
          {transition.state === 'idle' ? 'Login' : 'Logging in....'}
        </button>
        {error && <p style={{color: 'red'}}>{error.message}</p>}
      </Form>
    </div>
  )
}
