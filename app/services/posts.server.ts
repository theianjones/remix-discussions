import {v4 as uuidv4} from 'uuid'
import {CreatePost} from './validations'
import type {Post} from '~/services/db.server'
import {db} from '~/services/db.server'

export const createPost = (
  params: Pick<Post, 'title' | 'body' | 'authorId'>,
) => {
  const {title, body, authorId} = CreatePost.parse(params)
  const slug = uuidv4()

  return db.post.create({data: {title, body, authorId, slug}})
}
