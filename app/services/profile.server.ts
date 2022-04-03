import {db, Post, User} from './db'

export type ProfileUser = {
  email: string
  posts: Post[]
  following: User[]
  followers: User[]
}
export const getUserWithFollows = async ({
  userId,
}: {
  userId: string
}): Promise<ProfileUser> => {
  const {email, followedBy, posts, following} =
    (await db.user.findFirst({
      where: {id: userId},
      select: {
        email: true,
        posts: true,
        followedBy: {select: {following: true}},
        following: {select: {follower: true}},
      },
    })) ?? {}

  if (!email || !followedBy || !following || !posts) {
    throw Error('getUserWithFollows did not return the correct data')
  }

  return {
    email,
    followers: followedBy?.map((f) => f.following),
    following: following?.map((f) => f.follower),
    posts,
  }
}
