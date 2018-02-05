import path from 'path'

export default grunt => {
  grunt.initConfig({
    webfont: {
      icons: {
        src: 'svg/*.svg',
        dest: 'fonts',
        destCss: 'demo',
        destHtml: 'demo',
        options: {
          font: 'particles',
          fontFamilyName: 'Presslabs Particles',
          fontFilename: 'particles',
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
          htmlDemoTemplate: 'templates/demo.tmpl.html',
        },
      },
    },
  })
  grunt.loadNpmTasks('grunt-webfont')
  grunt.registerTask('default', ['webfont:icons'])
}
