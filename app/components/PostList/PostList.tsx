import {LinksFunction} from 'remix'
import type {Post} from '~/services/db.server'
import styles from './style.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

type Props = {
  posts: Pick<Post, 'title' | 'slug' | 'body'>[]
}

export const PostList = ({posts}: Props) => {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.title}>
          <div className="post-card">
            <h3>
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </h3>
            <p>{post.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
