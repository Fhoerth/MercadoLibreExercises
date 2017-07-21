const path = require('path')
const express = require('express')
const compression = require('compression')

const config = require('./config.json')

const app = express()
app.use(compression({ threshold: 0 }))
app.use(express.static(path.join(__dirname, config.dirs.public)))

app.listen(config.prod.port, function () {
  console.log(`
    🌎 Ready on http://${config.prod.host}:${config.prod.port}

    ⚙️  NODE_ENV = PRODUCTION
  `)
})
