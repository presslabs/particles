/* eslint-disable no-console */
import 'jsdom-global/register'
import Svgo from 'svgo'
import { map } from 'lodash'
import cheerio from 'cheerio'
import { format } from 'prettier'
import XMLSerializer from 'xmlserializer'
import Paper from 'paper/dist/paper-full'
import offsetPath, { joinOffsets } from './offset-path'

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
    .then(svg => convertPaths(svg, data))
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
  return svgo.optimize(svg).then(res => Buffer.from(res.data))
}

/**
 * Set default attibutes on SVG.
 * @param {string} svg - An SVG string.
 * @param {string} attrs - A set of SVG attributes to insert.
 * @returns {Promise<string>}
 */
const setAttrs = (svg, attrs) => {
  const $ = cheerio.load(svg)
  Object.keys(attrs).forEach(key => $('svg').attr(key, attrs[key]))
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

/**
 * Create offset path for original paths.
 * @param {string} svg - An SVG string.
 * @param {string} filename - SVG filename.
 * @returns {Promise<string>}
 */
const convertPaths = (svg, data) => {
  const { attributes, filename, offset } = data
  Paper.setup([attributes.width, attributes.height]).activate()
  const imported = Paper.project.importSVG(svg, { expandShapes: true })

  // Remove all clipping masks but not the root element
  map(imported.getItems({ clipMask: true }), shape => {
    if (!shape.isDescendant(Paper.project)) {
      shape.remove()
    }
  })

  // Create offset path from original paths
  const offsets = []
  map(imported.getItems({ type: 'path', clipMask: false }), path => {
    path.strokeJoin = 'round'
    path.strokeCap = 'round'

    const outerPath = offsetPath(path, offset, false)
    outerPath.insertBelow(path)
    outerPath.fillColor = 'red'
    const innerPath = offsetPath(path, -offset, false)
    innerPath.insertBelow(path)
    outerPath.fillColor = 'red'

    let result = joinOffsets(outerPath.clone(), innerPath.clone(), path, offset)

    result.remove()
    result = result.unite()
    result.insertBelow(path)

    result.fillColor = 'red'
    result.strokeWidth = null
    result.style = null
    offsets.push(result)
  })

  // Unite all paths
  let result = new Paper.Path()
  map(offsets, path => {
    result = result.unite(path)
  })
  result.fillColor = 'black'

  // Cleanup
  Paper.project.activeLayer.removeChildren()
  result.addTo(Paper.project.activeLayer)

  console.log(`Processing ${filename}`)
  return new Promise((resolve, reject) => {
    const data = XMLSerializer.serializeToString(
      Paper.project.exportSVG({ precision: 2 }),
    )
    if (data === '') {
      reject(new Error('Error serializing!'))
      return false
    }
    resolve(data)
    return true
  })
}

export default processSvg
