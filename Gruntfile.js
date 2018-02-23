/* eslint-disable func-names */
const path = require('path')
const cheerio = require('cheerio')

module.exports = function task(grunt) {
  grunt.initConfig({
    webfont: {
      particles: {
        src: 'svg/*.svg',
        dest: 'dist/fonts',
        destCss: 'dist/css',
        options: {
          font: 'particles',
          fontFamilyName: 'Presslabs Particles',
          fontFilename: 'particles',
          htmlDemo: false,
          ligatures: true,
          optimize: false,
          types: 'eot,woff2,woff,ttf,svg',
          rename: name => path.basename(name).replace(/-/g, '_'),
          fontPathVariables: true,
          fontPathVariable: 'particles-font-path',
          fontPathVariableName: 'particles-font-path',
          relativeFontPath: '../fonts/',
          templateOptions: {
            baseClass: 'particle',
            classPrefix: 'particle-',
          },
          stylesheets: ['css', 'scss'],
          template: 'templates/style.tmpl.css',
          customOutputs: [
            {
              template: 'templates/particles.json.tmpl',
              dest: 'app/icons/particles.json',
            },
          ],
        },
      },
    },
    clean: {
      demo: ['app/icons'],
      fonts: ['dist'],
    },
    'extract-svg-paths': {
      files: {
        src: 'svg/**/*.svg',
        dest: 'app/icons/particles-data.json',
      },
    },
  })

  grunt.registerMultiTask(
    'extract-svg-paths',
    'Extracts pathdata from svgs',
    function() {
      const pathObj = {}
      this.files.forEach(f => {
        f.src
          .filter(filepath => {
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn(`Source file ${filepath} not found.`)
              return false
            }
            return true
          })
          .forEach(filepath => {
            const svgContent = grunt.file.read(filepath)
            const filename = filepath.match(/([^\/]+)(?=\.\w+$)/)[0] // eslint-disable-line no-useless-escape
            const $ = cheerio.load(svgContent)
            const pathArray = $('path')
              .map(function() {
                return this.attribs.d
              })
              .get()
            pathObj[filename] = pathArray
          })
        grunt.file.write(f.dest, JSON.stringify(pathObj))
        grunt.log.writeln(`File ${f.dest} created.`)
      })
    },
  )

  grunt.loadNpmTasks('grunt-webfont')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.registerTask('default', [
    'clean:demo',
    'clean:fonts',
    'webfont:particles',
    'extract-svg-paths',
  ])
}
