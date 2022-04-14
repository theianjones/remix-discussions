import {Link, LoaderFunction, Outlet, useLoaderData} from 'remix'
import {authenticator, SessionUser} from '~/services/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request)
  return user
}

export default function App() {
  const user = useLoaderData<SessionUser>()
  return (
    <div style={{margin: 'auto', maxWidth: 1200}}>
      <nav style={{display: 'flex', justifyContent: 'justify-around'}}>
        <h1>Remix Discussions</h1>
        <ul>
          {user && (
            <>
              <li>{user.email}</li>
              <li>
                <form method="post" action="/logout">
                  <button type="submit">logout</button>
                </form>
              </li>
              <li>
                <Link to={'/profile'}>profile</Link>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signup">Create an Account</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
