import {LinksFunction, LoaderFunction, redirect, useLoaderData} from 'remix'
import {authenticator} from '~/services/auth.server'
import type {SessionUser} from '~/services/auth.server'
import {getUserWithFollows, ProfileUser} from '~/services/profile.server'
import {UserProfile, links as userProfileLinks} from '~/components/UserProfile'

export const links: LinksFunction = () => {
  return [...userProfileLinks()]
}

export const loader: LoaderFunction = async ({request}) => {
  const sessionUser = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const user = await getUserWithFollows({userId: sessionUser.id})

  return {sessionUser, user}
}

export default function ProfileIndex() {
  const {user, sessionUser} = useLoaderData<{
    user: ProfileUser
    sessionUser: SessionUser
  }>()

  return <UserProfile user={user} sessionUser={sessionUser} />
}
