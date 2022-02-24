// app/sessions.js
import {createCookieSessionStorage} from 'remix'

export const sessionStorage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__remix-discussions',
    // all of these are optional
    // domain: 'remix.run',
    expires: new Date(Date.now() + 60_000),
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: true,
  },
})

export const {getSession, commitSession, destroySession} = sessionStorage
