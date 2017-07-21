const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const spawn = require('child_process').spawn
const config = require('./config.json')

gulp.task('dev', function () {
  let vendorCommand = null

  if (!fs.existsSync(path.join(config.dirs.public, config.dirs.vendor))) {
    vendorCommand = spawn('webpack', ['--config=vendor.webpack.config.js', '--optimize-minimize'], { stdio: 'inherit' })
  }

  if (vendorCommand) {
    vendorCommand.on('close', function () {
      spawn('webpack-dev-server', [`--port=${config.dev.port}`, '--inline', '--inline', '--config=webpack.config.js'], { stdio: 'inherit' })
    })
  } else {
    spawn('webpack-dev-server', [`--port=${config.dev.port}`, '--inline', '--config=webpack.config.js'], { stdio: 'inherit' })
  }
})
