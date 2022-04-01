import type {ActionFunction} from 'remix'
import {redirect} from 'remix'
import {authenticator} from '~/services/auth.server'
import {createPost} from '~/services/posts.server'

export const action: ActionFunction = async ({request}) => {
  const requestBody = await request.formData()
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect(`/login`)
  }

  const post = await createPost({
    title: requestBody.get('title') as string | null,
    body: requestBody.get('body') as string,
    authorId: user.id,
  })

  return redirect(`/posts/${post.slug}`)
}

export default function NewPost() {
  return (
    <div>
      <h2>Create a Post</h2>
      <form method="post">
        <label htmlFor="title">Title</label>
        <input name="title" placeholder="Title of your post" />
        <label htmlFor="body">Body</label>
        <textarea name="body" placeholder="Write something amazing" />
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}
