import {db, Post, User} from './db.server'

export type ProfileUser = {
  email: string
  id: string
  posts: Post[]
  following: User[]
  followers: User[]
}
export const getUserWithFollows = async ({
  userId,
}: {
  userId: string
}): Promise<ProfileUser> => {
  const {email, followedBy, posts, following, id} =
    (await db.user.findFirst({
      where: {id: userId},
      select: {
        id: true,
        email: true,
        posts: true,
        followedBy: {select: {following: true}},
        following: {select: {follower: true}},
      },
    })) ?? {}

  if (!email || !followedBy || !following || !posts || !id) {
    throw Error('getUserWithFollows did not return the correct data')
  }

  return {
    email,
    id,
    followers: followedBy?.map((f) => f.following),
    following: following?.map((f) => f.follower),
    posts,
  }
}
