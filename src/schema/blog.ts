
import { z } from 'astro:content'

const glob = {
  base: './src/content/blog',
  pattern: '**\/[^_]*.{md,mdx}'
}

const schema = z.object({
  description: z.string(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  heroImage: z.string().optional(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional().default(['latest']),
  tagged: z.array(z.object({
    count: z.number().optional(),
    name: z.string(),
    href: z.string()
  })).optional(),
  title: z.string(),
  updatedDate: z.coerce.date().optional(),
})

export const blog = { glob, schema }
