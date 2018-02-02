/* eslint-disable no-console */
import gulp from 'gulp'
import iconfont from 'gulp-iconfont'
import rename from 'gulp-rename'
import consolidate from 'gulp-consolidate'
import del from 'del'
import path from 'path'
import eventStream from 'event-stream'
import svgscaler from 'svg-scaler'

import processIconSvg from './bin/process-icon-svg'
import processBrandSvg from './bin/process-brand-svg'

const runTimestamp = Math.round(Date.now() / 1000)

// Existing
const ICONS_DIR = path.resolve(__dirname, 'src/icons')
const BRANDS_DIR = path.resolve(__dirname, 'src/brands')
const TEMPLATES_DIR = path.resolve(__dirname, 'templates')

// Generated
const DEMO_DIR = path.resolve(__dirname, 'demo')
const PROCESSED_DIR = path.resolve(__dirname, 'svg')
const OUT_DIR = path.resolve(__dirname, 'fonts')

const sizeArg = 24
const offsetArg = 0.75

const attrs = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: sizeArg,
  height: sizeArg,
  viewBox: `0 0 ${sizeArg} ${sizeArg}`,
  fill: 'black',
  'fill-rule': 'nonzero',
}

const convertIcons = () =>
  eventStream.map((file, callback) => {
    if (file.isBuffer()) {
      const svg = String(file.contents)
      processIconSvg(svg, {
        attributes: attrs,
        offset: offsetArg,
        filename: file.relative,
      }).then(data => {
        file.contents = Buffer.from(data)
        callback(null, file)
      })
    }
    return true
  })

const convertBrands = () =>
  eventStream.map((file, callback) => {
    if (file.isBuffer()) {
      const svg = String(file.contents)
      processBrandSvg(svg, {
        attributes: attrs,
        offset: offsetArg,
        filename: file.relative,
      }).then(data => {
        file.contents = Buffer.from(data)
        callback(null, file)
      })
    }
    return true
  })

gulp.task('cleanup', () => {
  console.log(`Cleanup folder ${PROCESSED_DIR}/*`)
  del([`${PROCESSED_DIR}/*`])

  console.log(`Cleanup folder ${OUT_DIR}/*`)
  del([`${OUT_DIR}/*`])

  console.log(`Cleanup folder ${DEMO_DIR}/*`)
  del([`${DEMO_DIR}/*`])
})

gulp.task('convert-icons', () =>
  gulp
    .src([`${ICONS_DIR}/*.svg`])
    .pipe(convertIcons())
    .pipe(gulp.dest(PROCESSED_DIR))
    // this is a bug. force closed process
    .on('end', () => process.exit()),
)

gulp.task('convert-brands', () =>
  gulp
    .src([`${BRANDS_DIR}/*.svg`])
    .pipe(convertBrands())
    .pipe(gulp.dest(PROCESSED_DIR)),
)

gulp.task('generate-font', () =>
  gulp
    .src([`${PROCESSED_DIR}/*.svg`])
    .pipe(svgscaler({ width: 1200 }))
    .pipe(
      iconfont({
        fontName: 'Presslabs Particles',
        fileName: 'particles',
        prependUnicode: false,
        formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
        timestamp: runTimestamp,
        round: 5,
      }),
    )
    .on('glyphs', glyphs => {
      const options = {
        cssClass: 'particle',
        fontName: 'Presslabs Particles',
        fontPath: '../fonts/',
        glyphs: glyphs.map(glyph => ({
          fileName: glyph.name,
          codePoint: glyph.unicode[0].charCodeAt(0).toString(16),
        })),
      }
      gulp
        .src(`${TEMPLATES_DIR}/_style.css`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'style' }))
        .pipe(gulp.dest(DEMO_DIR))
      gulp
        .src(`${TEMPLATES_DIR}/_demo.html`)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'demo' }))
        .pipe(gulp.dest(DEMO_DIR))
    })
    .pipe(gulp.dest(OUT_DIR)),
)

gulp.task('generate', ['convert-icons', 'convert-brands', 'generate-font'])
