
import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import { blog } from '@src/schema/blog'

export const collections = {
  blog: defineCollection({
    loader: glob(blog.glob),
    schema: blog.schema,
  }),
}
