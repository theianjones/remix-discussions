import {ActionFunction, json, redirect} from 'remix'
import {authenticator} from '~/services/auth.server'
import {db} from '~/services/db'

type ActionData = {
  formError?: string
  fieldErrors?: {
    followingId: string | undefined
  }
  fields?: {
    followingId: string
    action: 'follow' | 'unfollow'
  }
}

const badRequest = (data: ActionData) => json(data, {status: 400})

export const action: ActionFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  const form = await request.formData()
  const followingId = user.id
  const followerId = form.get('followerId')
  const action = form.get('action')

  if (
    typeof followerId !== 'string' ||
    typeof action !== 'string' ||
    followerId === followingId
  ) {
    return badRequest({formError: `form not submitted correctly`})
  }

  switch (action) {
    case 'follow': {
      await db.follows.create({data: {followerId, followingId}})
      return redirect(`/profile/${followerId}`)
    }
    case 'unfollow': {
      await db.follows.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      })
      return redirect(`/profile/${followerId}`)
    }
    default: {
      return badRequest({formError: `unknown form action ${action}`})
    }
  }
}
