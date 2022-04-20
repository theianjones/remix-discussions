import {Link, LinksFunction} from 'remix'
import {SessionUser} from '~/services/auth.server'
import style from './style.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: style}]
}

export function Nav({user}: {user: SessionUser}) {
  return (
    <nav className="nav-wrapper">
      <h1 className="nav-header">Remix Discussions</h1>
      <ul className="nav-list">
        {user && (
          <>
            <li>
              <p className="email">{user.email}</p>
            </li>
            <li>
              <Link to={'/search'} className="button">
                Find a friend
              </Link>
            </li>
            <li>
              <Link to={'/profile'} className="button">
                Profile
              </Link>
            </li>
            <li>
              <form method="post" action="/logout">
                <button type="submit" className="button">
                  Logout
                </button>
              </form>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/login" className="button">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="button">
                Create an Account
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
