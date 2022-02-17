import type {LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'
import {db} from '~/services/db'
import type {Post} from '~/services/db'

export const loader: LoaderFunction = async () => {
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
