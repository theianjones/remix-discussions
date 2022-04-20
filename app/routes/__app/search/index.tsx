import { Link, LinksFunction, LoaderFunction, useLoaderData } from "remix"
import { authenticator } from "~/services/auth.server"
import type { SessionUser } from "~/services/auth.server"
import { getUsers } from "~/services/users.server"
import type { GetUsers } from "~/services/users.server"
import styles from '~/styles/search/index.css'

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export const loader: LoaderFunction = async ({request}) => {
    const sessionUser = await authenticator.isAuthenticated(request, {
        failureRedirect: '/login',
    })
    
    const params = new URLSearchParams(request.url)
    const users = await getUsers({currentEmail: sessionUser.email})

    return {
        sessionUser,
        users,
    }
}

export default function SearchPage() {
    const {users, sessionUser} = useLoaderData<{sessionUser: SessionUser, users: GetUsers[0]}>()
    return (
        <div className='search'>
            <h2>
            Find your friends
            </h2>
            <ul className='list'>
                {users.map(user => {
                    const sessionUserFollowsUser = user.followedBy.some((follow) => follow.followingId === sessionUser.id)
                    return (
                    <li key={user.id}>
                        <div className="user">
                            <Link to={`/profile/${user.id}`}>{user.email}</Link>
                            <form method="post" action="/follows?redirectUri=/search">
                                <input
                                style={{display: 'none'}}
                                name="action"
                                value={sessionUserFollowsUser ? 'unfollow' : 'follow'}
                                />
                                <input style={{display: 'none'}} name="followerId" value={user.id} readOnly/>
                                <button type="submit" className="button">
                                {sessionUserFollowsUser ? 'Unfollow' : 'Follow'}
                                </button>
                            </form>
                        </div>
                    </li>
                )})}
            </ul>
        </div>
    )
}