import type {LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

export const posts = [
  {
    title: 'First post',
    body: 'This is my first post and it is awesome.',
    path: '/posts/first-post',
    slug: 'first-post',
  },
]

export const loader: LoaderFunction = () => {
  return posts
}

export type Post = {
  title: string
  body: string
  path: string
}

export default function PostsIndex() {
  const posts = useLoaderData<Post[]>()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.title}>
          <a href={post.path}>{post.body}</a>
        </li>
      ))}
    </ul>
  )
}
