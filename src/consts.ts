
// Site config.
export const SITE = {
  TITLE: 'Astromorph',
  DESCRIPTION: 'A framework free Astro starter template.',

  BASE: '/',
  URL: 'https://localhost/',

  LANG: 'en',
  LOCALE: 'en-GB',
  TIMEZONE: 'Europe/London',

  LATEST_POSTS: 4,
  PER_PAGE: 4,
  RELATED_POSTS: 4,

  // collections routes.
  ROUTES: {
    BLOG: 'blog',
    TAGS: 'blog/tags',
  },
} as const

// Site navigation.
export const NAVIGATION = [
  {
    href: SITE.ROUTES.BLOG,
    title: 'Blog',
  },
  {
    href: 'about',
    title: 'About',
  },
  {
    href: 'https://astro.build',
    title: 'Astro',
    external: true,
  },
] as {
  href: string
  title: string
  external: boolean | undefined
}[]

// Auto import components, read more:
// https://github.com/delucis/astro-auto-import/
export const IMPORTS = [
  './src/components/YouTube.astro'
]
