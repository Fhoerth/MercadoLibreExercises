import { expect } from 'chai'
import productsResource from '../../../app/store/products'

const {
  actionCreators,
  reducer,
  defaultState
} = productsResource

const mockData = [{
  id: 1
}, {
  id: 2
}]

describe('Products reducer', function () {
  it('should set state for FETCH_PRODUCTS', function () {
    const state = defaultState
    const result = reducer(state, actionCreators.fetchProducts())

    expect(result).to.deep.contain({
      awaitingFetch: true
    })
  })

  it('should set state for FETCH_PRODUCTS_SUCCESS', function () {
    const state = defaultState
    const ErrorState = reducer(state, actionCreators.fetchProductsFailure('Error'))
    const result = reducer(ErrorState, actionCreators.fetchProductsSuccess(mockData))

    expect(result).to.deep.contain({
      data: mockData,
      awaitingFetch: false,
      fetchSuccess: true,
      fetchFailure: false,
      fetchErrorMessage: null
    })
  })

  it('should set state for FETCH_PRODUCTS_FAILURE', function () {
    const state = defaultState
    const SuccessState = reducer(state, actionCreators.fetchProductsSuccess(mockData))
    const result = reducer(SuccessState, actionCreators.fetchProductsFailure('Error'))

    expect(result).to.deep.contain({
      data: mockData,
      awaitingFetch: false,
      fetchSuccess: false,
      fetchFailure: true,
      fetchErrorMessage: 'Error'
    })
  })
})
