import nock from 'nock'
import assert from 'assert'
import { expect } from 'chai'
import APIClient, { fallbackErrorMessage, APIError } from '../../app/lib/APIClient'

describe('handleError', function () {
  const instance = new APIClient('http://base/url')

  it('should throw an error with an error message', function () {
    function CustomError () {
      this.name = 'CustomError'
      this.message = 'Error Message'
    }

    CustomError.prototype = Error.prototype

    const customError = new CustomError()

    let errorThrown = false
    try {
      instance.handleError(customError)
    } catch (e) {
      errorThrown = true
      expect(e).to.deep.equal(new APIError(customError))
      expect(e.message).to.equal('Error Message')
    }

    expect(errorThrown).to.equal(true)
  })

  it('should throw an error with fallback error message', function () {
    function CustomError () {
      this.name = 'CustomError'
    }

    CustomError.prototype = Error.prototype

    const customError = new CustomError()

    let errorThrown = false
    try {
      instance.handleError(customError)
    } catch (e) {
      errorThrown = true
      expect(e).to.deep.equal(new APIError(customError))
      expect(e.message).to.equal(fallbackErrorMessage)
    }

    expect(errorThrown).to.equal(true)
  })
})

describe('APIClient instance', function () {
  const instance = new APIClient('http://base/url')

  it('should have client property defined', function () {
    expect(typeof instance.client).to.equal('function')
  })

  it('should have baseURL defined', function () {
    expect(instance.client.defaults.baseURL).to.equal('http://base/url')
  })
})

describe('fetchProducts', function () {
  const mockResults = require('../mocks/ipod.search.mock.json')

  it('should call MercadoLibre API with q=ipod, and default limit/offset parameters', function () {
    const mercadoLibreBaseAPIUrl = 'https://api.mercadolibre.com/sites/MLA'
    const instance = new APIClient(mercadoLibreBaseAPIUrl)

    nock(mercadoLibreBaseAPIUrl)
      .get('/search')
      .query(qs => {
        assert.deepEqual(qs, {
          q: 'ipod',
          limit: '4',
          offset: '0'
        })
        return true
      })
      .reply(200, mockResults)

    return instance.fetchProducts({ q: 'ipod' }).then(result => {
      expect(result).to.deep.equal(mockResults)
    })
  })

  it('should call MercadoLibre API with q=ipod, limit=4, offset=4', function () {
    const mercadoLibreBaseAPIUrl = 'https://api.mercadolibre.com/sites/MLA'
    const instance = new APIClient(mercadoLibreBaseAPIUrl)

    nock(mercadoLibreBaseAPIUrl)
      .get('/search')
      .query(qs => {
        assert.deepEqual(qs, {
          q: 'ipod',
          limit: '4',
          offset: '4'
        })
        return true
      })
      .reply(200, mockResults)

    return instance.fetchProducts({ q: 'ipod', page: 2, productsPerPage: 4 }).then(result => {
      expect(result).to.deep.equal(mockResults)
    })
  })
})
