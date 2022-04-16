import React from 'react'
import {Link, LinksFunction} from 'remix'
import {SessionUser} from '~/services/auth.server'
import {ProfileUser} from '~/services/profile.server'
import {PostList, links as postListLinks} from './PostList'

export const links: LinksFunction = () => {
  return [...postListLinks()]
}

type Props = {
  user: ProfileUser
  sessionUser: SessionUser
}
export const UserProfile = ({
  user,
  sessionUser,
  children,
}: Props & {children?: React.ReactNode}) => {
  const {following, followers, posts} = user
  return (
    <div>
      {children}
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
          <PostList posts={posts} />
        ) : (
          <p>{user.email} has no posts yet.</p>
        )}
      </div>
    </div>
  )
}
