import type {LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'
import {db} from '~/services/db'
import type {Post} from '~/services/db'
import {authenticator, SessionUser} from '~/services/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  return await db.post.findMany()
}

export default function PostsIndex() {
  const posts = useLoaderData<Post[]>()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.title}>
          <a href={`/posts/${post.slug}`}>{post.body}</a>
        </li>
      ))}
    </ul>
  )
}
