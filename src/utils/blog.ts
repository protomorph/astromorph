
import { slug } from 'github-slugger'
import { permalink } from '@src/utils/permalink'
import { type CollectionEntry, getCollection } from 'astro:content'

export type TaggedItem = {
  count?: number
  href: string
  name: string
}

function filterDrafts (
  { data }: CollectionEntry<'blog'>
): boolean {
  if (import.meta.env.PROD)
    return data.pubDate.getTime() < Date.now()
      || data.draft !== true

  return true
}

function filterByTag (
  posts: CollectionEntry<'blog'>[],
  tag: string
): CollectionEntry<'blog'>[] {
  return posts.filter(
    ({ data }) => data.tags.map(
      (t: string) => slug(t)
    ).includes(slug(tag))
  )
}

export async function allPosts (): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog', filterDrafts)).sort((
    a: CollectionEntry<'blog'>,
    b: CollectionEntry<'blog'>
  ) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export async function getPosts (
  limit?: number
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await allPosts()

  for (let { data } of posts) {
    data.tagged = data.tags && data.tags.map((tag: string) => ({
      href: permalink.tags(slug(tag)),
      name: tag,
    })) || []
  }

  return posts.slice(0, limit ?? posts.length)
}

export async function getTags (
  limit?: number
): Promise<TaggedItem[]> {
  const posts = (await allPosts())
  const tags = [...new Set(posts.flatMap(
    ({ data }) => data.tags || []
  ).filter(Boolean))]

  return tags.map((tag: string) => ({
    count: filterByTag(posts, tag).length,
    href: permalink.tags(slug(tag)),
    name: tag,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
  .sort((a, b) => b.count - a.count)
  .slice(0, limit ?? tags.length)
}

export function adjoiningPost (
  post: CollectionEntry<'blog'> | null
): { href: string, title: string } | null {
  return post && {
    href: permalink.blog(post.id),
    title: post.data.title
  } || null
}

export function featuredPosts (
  posts: CollectionEntry<'blog'>[],
  limit?: number
): CollectionEntry<'blog'>[] {
  const feat = posts.filter(
    ({ data }) => data.featured
  )

  return [...feat].slice(0, limit ?? feat.length)
}

export function readingTime (body: string) {
  const text = body.replace(/<[^>]+>/g, '')
  const count = text.split(/\s+/).length
  return `${((count / 200) + 1).toFixed()} minute read`
}

export function relatedPosts (
  { data, id }: CollectionEntry<'blog'>,
  posts: CollectionEntry<'blog'>[],
  limit: number = 4
):CollectionEntry<'blog'>[] {
  return posts.filter((post: CollectionEntry<'blog'>) => {
    return post.id !== id && data.tags.some(
      (tag: string) => post.data.tags.includes(tag)
    )
  })
  .slice(0, limit) || []
}
