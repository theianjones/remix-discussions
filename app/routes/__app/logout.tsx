import {ActionFunction} from 'remix'
import {authenticator} from '~/services/auth.server'

export const action: ActionFunction = ({request}) => {
  return authenticator.logout(request, {redirectTo: '/login'})
}
