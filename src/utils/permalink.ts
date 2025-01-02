
import { SITE } from '@src/consts'

const root = import.meta.env.BASE_URL.replace(/\/$/g, '')

const strip = (str: string) => str.replace(/^\/|\/$/g, '')

export const permalink = {
  base: (slug: string) => `${root}/${strip(slug)}`,
  blog: (slug: string) => `${root}/${SITE.ROUTES.BLOG}/${strip(slug)}`,
  tags: (slug: string) => `${root}/${SITE.ROUTES.TAGS}/${strip(slug)}`,
}
