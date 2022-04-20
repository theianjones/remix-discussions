import {Link, LinksFunction, Outlet} from 'remix'
import styles from '~/styles/search/layout.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export default function Posts() {
  return (
    <div className='search'>
      <div className='header'>
        <h1>
         Search
        </h1>
      </div>
      <Outlet />
    </div>
  )
}
