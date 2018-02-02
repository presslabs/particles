/* eslint-disable no-console */
import 'jsdom-global/register'
import Svgo from 'svgo'
import cheerio from 'cheerio'
import { format } from 'prettier'

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {string} attrs - A set of SVG attributes to insert.
 * @param {string} filename - SVG filename.
 * @param {Promise<string>}
 */
const processSvg = (svg, data) => {
  const { attributes, filename } = data
  return removeGroups(svg)
    .then(svg => optimize(svg))
    .then(svg => setAttrs(svg, attributes, filename))
    .then(format)
    .then(svg => svg.replace(/;/g, ''))
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
const optimize = svg => {
  const svgo = new Svgo({
    plugins: [
      { cleanupNumericValues: { floatPrecision: 2 } },
      { removeAttrs: { attrs: '(?!d).*' } },
      { removeTitle: true },
    ],
  })
  return new Promise(resolve => {
    svgo.optimize(svg, ({ data }) => resolve(data))
  })
}

/**
 * Set default attibutes on SVG.
 * @param {string} svg - An SVG string.
 * @param {string} attrs - A set of SVG attributes to insert.
 * @returns {Promise<string>}
 */
const setAttrs = (svg, attrs, filename) => {
  const $ = cheerio.load(svg)
  Object.keys(attrs).forEach(key => $('svg').attr(key, attrs[key]))
  console.log(`Processing ${filename}`)
  return new Promise((resolve, reject) => {
    const data = $('body').html()
    if (data === null) {
      reject(new Error('SVG is empty!'))
      return false
    }
    resolve(data)
    return true
  })
}

/**
 * Remove SVG group <g> tags.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
const removeGroups = svg => {
  const $ = cheerio.load(svg)
  const removeGroupTags = markup => {
    const element = cheerio.load(markup)('body')
    const first = element.children().first()
    if (first.get(0).tagName === 'g') {
      return removeGroupTags(
        element
          .children()
          .first()
          .html(),
      )
    }
    return element.html()
  }
  return new Promise((resolve, reject) => {
    const data = removeGroupTags($('svg').html())
    if (data === null) {
      reject(new Error('SVG is empty!'))
      return false
    }
    resolve($('body').html())
    return true
  })
}

export default processSvg
