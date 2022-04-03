import {Link} from 'remix'
import {SessionUser} from '~/services/auth.server'
import {ProfileUser} from '~/services/profile.server'

type Props = {
  user: ProfileUser
  sessionUser: SessionUser
}
export const UserProfile = ({user, sessionUser}: Props) => {
  const {following, followers, posts} = user
  return (
    <div>
      <div>
        <h2>email</h2> <p>{user.email}</p>
      </div>
      <div>
        <h2>Followers ({followers.length})</h2>
        {followers.length > 0 ? (
          <ul>
            {followers.map((user) => (
              <li key={user.id}>
                <Link to={`/profile/${user.id}`}>{user.email}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No one is following {user.email} yet.</p>
        )}
      </div>
      <div>
        <h2>Following ({following.length})</h2>
        {following.length > 0 ? (
          <ul>
            {following.map((user) => (
              <li key={user.id}>
                <Link to={`/profile/${user.id}`}>{user.email}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>{user.email} is not following anyone</p>
        )}
      </div>
      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.title}>
              <a href={`/posts/${post.slug}`}>{post.body}</a>
            </li>
          ))
        ) : (
          <p>{user.email} has no posts yet.</p>
        )}
      </div>
    </div>
  )
}
