import {LinksFunction, LoaderFunction, Outlet, useLoaderData} from 'remix'
import {authenticator, SessionUser} from '~/services/auth.server'
import {Nav, links as navLinks} from '~/components/Nav'

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request)
  return user
}

export const links: LinksFunction = () => {
  return [...navLinks()]
}

export default function App() {
  const user = useLoaderData<SessionUser>()
  return (
    <div style={{margin: 'auto', maxWidth: 1200}}>
      <Nav user={user} />
      <Outlet />
    </div>
  )
}
