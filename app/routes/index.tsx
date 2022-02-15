import type {LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

export default function Index() {
  const data = useLoaderData<Post[]>()
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1>Welcome to Remix</h1>
    </div>
  )
}
