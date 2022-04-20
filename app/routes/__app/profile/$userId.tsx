import {LinksFunction, LoaderFunction, redirect, useLoaderData} from 'remix'
import {authenticator} from '~/services/auth.server'
import type {SessionUser} from '~/services/auth.server'
import {getUserWithFollows, ProfileUser} from '~/services/profile.server'
import type {User} from '~/services/db.server'
import {UserProfile, links as userProfileLinks} from '~/components/UserProfile'

export const links: LinksFunction = () => {
  return [...userProfileLinks()]
}

export const loader: LoaderFunction = async ({request, params}) => {
  const sessionUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  const userId = params.userId

  if (!userId) {
    return redirect('/posts')
  }

  if(userId === sessionUser.id){
    return redirect('/profile')
  }

  const user = await getUserWithFollows({userId})

  return {sessionUser, user}
}

export default function ProfileShow() {
  const {sessionUser, user} = useLoaderData<{
    sessionUser: SessionUser
    user: ProfileUser
  }>()

  const sessionUserFollowsUser = user.followers.some(
    (f) => f.id === sessionUser.id,
  )

  return (
    <UserProfile user={user} sessionUser={sessionUser}>
      <form method="post" action="/follows">
        <input
          style={{display: 'none'}}
          name="action"
          value={sessionUserFollowsUser ? 'unfollow' : 'follow'}
        />
        <input style={{display: 'none'}} name="followerId" value={user.id} readOnly/>
        <button type="submit" className='button'>
          {sessionUserFollowsUser ? 'Unfollow' : 'Follow'}
        </button>
      </form>
    </UserProfile>
  )
}
