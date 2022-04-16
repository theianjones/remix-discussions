import {ActionFunction, LoaderFunction, useTransition} from 'remix'
import {Form, json, useLoaderData} from 'remix'
import {authenticator, USER_LOGIN} from '~/services/auth.server'
import {getSession} from '~/services/session.server'

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
    <>
      <h1>Login</h1>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="user-name" required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          disabled={transition.state !== 'idle'}
          className="button"
        >
          {transition.state === 'idle' ? 'Login' : 'Logging in....'}
        </button>
        {error && <p style={{color: 'red'}}>{error.message}</p>}
      </Form>
    </>
  )
}
