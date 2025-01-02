
import { html } from 'satori-html'
import { SITE } from '@src/consts'
import type { CollectionEntry } from 'astro:content'

function paletteFromString (
  text: string,
  saturation: number = 90,
  lightness: number = 50,
  alpha: number = 50,
  rotation: number = 90
) {
  let primary = [...text].reduce((a, _, i) => text.charCodeAt(i) + ((a << 5) - a), 0) % 360
  let secondary = primary + rotation

  return {
    primary: `hsl(${primary} ${saturation}% ${lightness}% / ${alpha}%)`,
    secondary: `hsl(${secondary} ${saturation}% ${lightness}% / ${alpha}%)`,
  }
}

export function svgTemplate (
  data: CollectionEntry<'blog'>['data'],
  {
    bgColor = '#202532',
    height = '630px',
    width = '1200px',
    blur = '88px',
    rotation = 120,
    saturation = 96,
    lightness = 48,
    alpha = 49,
  } = {}
) {
  const { pubDate, title, tags } = data
  const { primary, secondary } = paletteFromString(
    title, saturation, lightness, alpha, rotation
  )
  const date = new Intl.DateTimeFormat(SITE.LOCALE, {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(pubDate)

  return html(
    `<div style="background: ${bgColor}; width: ${width}; height: ${height}; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div style="width: 150%; height: 150%; display: flex; align-items: center; position: absolute; top: 0; filter: blur(${blur});">
        <div style="background: linear-gradient(90deg, ${primary}, ${secondary}); width: 100%; height: 100%;">&nbsp;</div>
      </div>
      <h1 style="color: hsl(0 0% 98%); font-family: Recursive; font-size: 88px; font-weight: 400; text-align: center; text-wrap: balance; margin: auto .5em .125em; position: relative;">${title}</h1>
      <div style="color: hsl(0 0% 98% / 64%); font-size: 42px; font-weight: 400; display: flex; justify-content: center; margin: .125em 1em .25em;">${date}</div>
      <div style="color: hsl(0 0% 98% / 56%); font-size: 42px; font-weight: 400; display: flex; gap: 1em; justify-content: center; margin: 0 1em auto;">${tags.map((tag: string) => (`<span>#<b>${tag}</b></span>`)).join(``)}</div>
    </div>`
  )
}
