import type {LinksFunction} from 'remix'
import style from './style.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: style}]
}

export const PostForm = () => {
  return (
    <form method="post" className="posts-form">
      <label htmlFor="title" className="form-field">
        Title
        <input name="title" placeholder="Title of your post" />
      </label>
      <label htmlFor="body" className="form-field">
        Body
        <textarea name="body" placeholder="Write something amazing" />
      </label>
      <button type="submit" className="button">
        Create Post
      </button>
    </form>
  )
}
