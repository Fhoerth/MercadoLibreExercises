const hook = require('css-modules-require-hook')
const sass = require('node-sass')
const path = require('path')

hook({
  extensions: ['.scss'],
  preprocessCss: function (css, filename) {
    const result = sass.renderSync({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      data: css,
      file: filename,
      includePaths: [path.resolve(__dirname, '..', 'app', 'styles')]
    })

    return result.css
  }
})
