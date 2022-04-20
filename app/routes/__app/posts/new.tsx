import type {ActionFunction, LinksFunction} from 'remix'
import {redirect} from 'remix'
import {PostForm, links as postFormLinks} from '~/components/PostForm'
import {authenticator} from '~/services/auth.server'
import {createPost} from '~/services/posts.server'
import styles from '~/styles/posts/new.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}, ...postFormLinks()]
}

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
    <div className="wrapper">
      <h2>Create a Post</h2>
      <PostForm />
    </div>
  )
}
