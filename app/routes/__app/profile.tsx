import {LoaderFunction, Outlet} from 'remix'
import {authenticator} from '~/services/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return {}
}

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Outlet />
    </div>
  )
}
