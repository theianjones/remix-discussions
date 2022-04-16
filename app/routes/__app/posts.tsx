import {Link, LinksFunction, Outlet} from 'remix'
import styles from '~/styles/postsLayout.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export default function Posts() {
  return (
    <div>
      <div className="posts-header">
        <h1>
          <Link to="/posts">Posts</Link>
        </h1>
        <Link to="/posts/new" className="button">
          New Post
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
