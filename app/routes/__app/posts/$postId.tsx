import {LoaderFunction, useCatch} from 'remix'
import {useLoaderData, json} from 'remix'
import {db} from '~/services/db'
import type {Post} from '~/services/db'

export const loader: LoaderFunction = async ({params}) => {
  const post = await db.post.findFirst({where: {slug: params.postId}})

  if (!post) {
    throw json({error: 'Not Found'}, {status: 404})
  }

  return post
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
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
