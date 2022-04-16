import type {LinksFunction, LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'
import {db} from '~/services/db.server'
import type {Post} from '~/services/db.server'
import {authenticator} from '~/services/auth.server'
import {PostList, links as postListLinks} from '~/components/PostList'

export const links: LinksFunction = () => {
  return [...postListLinks()]
}

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  const following = await db.follows.findMany({
    where: {followerId: {equals: user.id}},
    select: {followingId: true},
  })
  return await db.post.findMany({
    where: {authorId: {in: [...following.map((f) => f.followingId), user.id]}},
  })
}

export default function PostsIndex() {
  const posts = useLoaderData<Post[]>()

  return <PostList posts={posts} />
}
