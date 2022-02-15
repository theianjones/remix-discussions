import {LoaderFunction, useLoaderData} from 'remix'
import {Outlet} from 'remix'

export default function Posts() {
  return (
    <div>
      <h1>Posts</h1>
      <Outlet />
    </div>
  )
}
