
import rss from '@astrojs/rss'
import { SITE } from '@src/consts'
import { allPosts } from '@src/utils/blog'
import type { APIContext, APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'

export const GET: APIRoute = async (context: APIContext) => {
	const posts = await allPosts()

	return rss({
		title: SITE.TITLE,
		description: SITE.DESCRIPTION,
		site: context.site as URL,
		items: posts.map((post: CollectionEntry<'blog'>) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	})
}
