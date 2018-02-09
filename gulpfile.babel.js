/* eslint-disable no-console */
import gulp from 'gulp'
// import replace from 'gulp-replace'
import del from 'del'
import path from 'path'
import eventStream from 'event-stream'

import processIconSvg from './bin/process-icon-svg'
import processBrandSvg from './bin/process-brand-svg'

// Existing
const ICONS_DIR = path.resolve(__dirname, 'src/icons')
const BRANDS_DIR = path.resolve(__dirname, 'src/brands')

// Generated
const PROCESSED_DIR = path.resolve(__dirname, 'svg')

const sizeArg = 64
const offsetArg = 1.5

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

gulp.task('default', ['cleanup', 'convert-icons', 'convert-brands'])
