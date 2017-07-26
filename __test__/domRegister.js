const { JSDOM } = require('jsdom')

const jsdom = new JSDOM(`<!doctype html><body></body></html>`)
const { window } = jsdom
const defaultGlobal = Object.assign({}, global)

export function tearUp () {
  global.window = window
  global.document = window.document
  global.navigator = {
    userAgent: 'node.js'
  }
}

export function tearDown () {
  Object.keys(defaultGlobal).forEach((property) => {
    global[property] = defaultGlobal[property]
  })
}
