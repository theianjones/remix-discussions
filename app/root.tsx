import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type {MetaFunction} from 'remix'
import sharedStyles from '~/styles/shared.css'

export const meta: MetaFunction = () => {
  return {title: 'New Remix App'}
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css',
    },
    {
      rel: 'stylesheet',
      href: sharedStyles,
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
