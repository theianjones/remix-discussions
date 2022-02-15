import type {LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

import {posts} from './index'
import type {Post} from './'

export const loader: LoaderFunction = ({params}) => {
  const postId = params.postId

  const post = posts.find((post) => post.slug === postId)

  return post
}

export default function PostShow() {
  const post = useLoaderData<Post>()

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </article>
  )
}
