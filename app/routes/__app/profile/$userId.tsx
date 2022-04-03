import {LoaderFunction, redirect, useLoaderData} from 'remix'
import {authenticator} from '~/services/auth.server'
import type {SessionUser} from '~/services/auth.server'
import {getUserWithFollows, ProfileUser} from '~/services/profile.server'
import type {User} from '~/services/db'
import {UserProfile} from '~/components/UserProfile'

export const loader: LoaderFunction = async ({request, params}) => {
  const sessionUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  const userId = params.userId

  if (!userId) {
    return redirect('/posts')
  }

  const user = await getUserWithFollows({userId})

  return {sessionUser, user}
}

export default function ProfileShow() {
  const {sessionUser, user} = useLoaderData<{
    sessionUser: SessionUser
    user: ProfileUser
  }>()

  return <UserProfile user={user} sessionUser={sessionUser} />
}
