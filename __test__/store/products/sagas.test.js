import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import productsResource from '../../../app/store/products'
import APIClient from '../../../app/lib/APIClient'

const mercadoLibreBaseAPIUrl = 'https://api.mercadolibre.com/sites/MLA'

describe('Products saga', function () {
  describe('fetchProduct', function () {
    const responseMock = require('../../mocks/ipod.search.mock.json')
    const apiClient = new APIClient(mercadoLibreBaseAPIUrl)
    const boundFetchProducts = apiClient.fetchProducts.bind(apiClient)
    const sagas = productsResource.createSagas({
      apiFetchProducts: boundFetchProducts
    })

    describe('when request is fulfilled', function () {
      it('should dispatch a FETCH_PRODUCTS_SUCCESS action with data', function () {
        const action = productsResource.actionCreators.fetchProducts({
          q: 'ipod', page: 1, productsPerPage: 4
        })
        const successAction = productsResource.actionCreators.fetchProductsSuccess(responseMock)
        const gen = sagas.fetchProducts(action)

        expect(gen.next().value).to.deep.equal(
          call(boundFetchProducts, { q: 'ipod', page: 1, productsPerPage: 4 })
        )

        expect(gen.next(responseMock).value).to.deep.equal(
          put(successAction)
        )
      })
    })

    describe('when request is rejected', function () {
      it('should dispatch a FETCH_PRODUCTS_FAILURE action with data', function () {
        const errorMessage = 'Some error ocurred while trying to fetch products'
        const action = productsResource.actionCreators.fetchProducts({
          q: 'ipod'
        })
        const failureAction = productsResource.actionCreators.fetchProductsFailure(errorMessage)
        const gen = sagas.fetchProducts(action)

        expect(gen.next().value).to.deep.equal(
          call(boundFetchProducts, { q: 'ipod', page: 1 })
        )

        expect(gen.throw(new Error(errorMessage)).value).to.deep.equal(
          put(failureAction)
        )
      })
    })
  })
})
