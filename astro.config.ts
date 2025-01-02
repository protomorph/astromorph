// @ts-check
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { IMPORTS } from './src/consts'
import { fileURLToPath } from 'node:url'
import AutoImport from 'astro-auto-import'
import { defineConfig } from 'astro/config'
import { dirname, resolve } from 'node:path'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'

const dir = dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [
    AutoImport({ imports: IMPORTS }),
    sitemap(),
    mdx(),
  ],
  markdown: {
    gfm: true,
    shikiConfig: {
      // https://shiki.style/themes
      theme: 'dracula',
      defaultColor: false,
      transformers: [transformerColorizedBrackets()],
    },
  },
  vite: {
    resolve: {
      alias: {
        '@src': resolve(dir, './src'),
      },
    },
  },
  experimental: {
    svg: { mode: 'inline' },
  }
})
