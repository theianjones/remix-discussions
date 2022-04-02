import {Link, LoaderFunction, Outlet, useLoaderData} from 'remix'
import {authenticator, SessionUser} from '~/services/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request)
  return user
}

export default function App() {
  const user = useLoaderData<SessionUser>()
  return (
    <div>
      <nav style={{display: 'flex', justifyContent: 'justify-around'}}>
        <h1>Remix Discussions</h1>
        <ul>
          {user && <li>{user.email}</li>}
          {user && (
            <li>
              <form method="post" action="/logout">
                <button type="submit">logout</button>
              </form>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">login</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/signup">Create an Account</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
