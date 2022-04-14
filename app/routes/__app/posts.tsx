import {Link, Outlet} from 'remix'

export default function Posts() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Posts</h1>
        <Link to="/posts/new">New Post</Link>
      </div>
      <Outlet />
    </div>
  )
}
