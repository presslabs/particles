const path = require('path')

module.exports = function task(grunt) {
  grunt.initConfig({
    webfont: {
      particles: {
        src: 'svg/*.svg',
        dest: 'fonts',
        destCss: 'files/resources',
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
              dest: 'files/resources/particles.json',
            },
          ],
        },
      },
    },
    clean: {
      demo: ['files/resources'],
      fonts: ['fonts'],
    },
  })

  grunt.loadNpmTasks('grunt-webfont')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.registerTask('default', [
    'clean:demo',
    'clean:fonts',
    'webfont:particles',
  ])
}
