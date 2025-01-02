
import sharp from 'sharp'
import { getPosts } from '@src/utils/blog'
import { readFile } from 'node:fs/promises'
import { svgTemplate } from '@src/utils/svg'
import type { APIContext, APIRoute } from 'astro'
import satori, { type SatoriOptions } from 'satori'
import type { CollectionEntry } from 'astro:content'

type Props = { data: CollectionEntry<'blog'>['data'] }

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Poppins',
      data: await readFile(`${process.cwd()}/public/assets/fonts/poppins-bold.ttf`),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'Poppins',
      data: await readFile(`${process.cwd()}/public/assets/fonts/poppins-regular.ttf`),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Recursive',
      data: await readFile(`${process.cwd()}/public/assets/fonts/recursive-regular.ttf`),
      weight: 400,
      style: 'normal',
    },
  ]
}

export const GET: APIRoute = async ({ props }: APIContext) => {
  const { data } = props as Props
  const svg = await satori(svgTemplate(data), options)
  const png = sharp(Buffer.from(svg)).png({
    compressionLevel: 8,
    dither: 1.0,
    effort: 5,
    palette: true,
    progressive: true,
    quality: 99,
  })

  return new Response(await png.toBuffer(), {
    headers: {
      'Content-Type': 'image/png',
    },
    status: 200,
  })
}

export async function getStaticPaths () {
  const posts = await getPosts()

  return posts.map(({ data, id }: CollectionEntry<'blog'>) => ({
    params: { id },
    props: { data },
  }))
}
