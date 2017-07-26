import { expect } from 'chai'
import productsResource from '../../../app/store/products'

const { actionTypes, actionCreators } = productsResource

const mockData = {
  results: [{
    id: 1
  }, {
    id: 2
  }]
}

describe('Products actionCreator', function () {
  describe('fetchProduct', function () {
    it('should return a plain object', function () {
      const result1 = actionCreators.fetchProducts()
      expect(result1).to.deep.contain({
        type: actionTypes.FETCH_PRODUCTS,
        merge: false
      })

      const result2 = actionCreators.fetchProducts({ merge: true, q: 'ipod', page: 1, productsPerPage: 1 })
      expect(result2).to.deep.equal({
        type: actionTypes.FETCH_PRODUCTS,
        merge: true,
        page: 1,
        productsPerPage: 1,
        q: 'ipod'
      })
    })
  })

  describe('fetchProductSuccess', function () {
    it('should return a plain object', function () {
      const result = actionCreators.fetchProductsSuccess(mockData)
      expect(result).to.deep.equal({
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        response: mockData
      })
    })
  })

  describe('fetchProductFailure', function () {
    it('should return a plain object', function () {
      const result = actionCreators.fetchProductsFailure('Error')
      expect(result).to.deep.equal({
        type: actionTypes.FETCH_PRODUCTS_FAILURE,
        errorMessage: 'Error'
      })
    })
  })
})
