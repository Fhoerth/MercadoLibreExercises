import { expect } from 'chai'
import { merge } from 'ramda'
import productsResource from '../../../app/store/products'

const {
  actionCreators,
  reducer,
  defaultState
} = productsResource

const mockData = {
  results: [{
    id: 1
  }, {
    id: 2
  }]
}

describe('Products reducer', function () {
  it('should set state for FETCH_PRODUCTS when action.merge is false', function () {
    const state = merge(defaultState, {
      // Force awaitingFetch value to false for assertion
      awaitingFetch: false
    })

    const result = reducer(state, actionCreators.fetchProducts({ merge: false }))

    expect(result).to.deep.contain({
      awaitingFetch: true
    })
  })

  it('should set state for FETCH_PRODUCTS when action.merge is true', function () {
    const state = merge(defaultState, {
      // Force awaitingFetchMore value to false for assertion
      awaitingFetchMore: false
    })

    const result = reducer(state, actionCreators.fetchProducts({ merge: true }))

    expect(result).to.deep.contain({
      awaitingFetchMore: true
    })
  })

  it('should set state for FETCH_PRODUCTS_SUCCESS', function () {
    const state = defaultState
    const ErrorState = reducer(state, actionCreators.fetchProductsFailure('Error'))
    const result = reducer(ErrorState, actionCreators.fetchProductsSuccess(mockData))

    expect(result).to.deep.contain({
      data: mockData.results,
      awaitingFetch: false,
      awaitingFetchMore: false,
      fetchSuccess: true,
      fetchFailure: false,
      fetchErrorMessage: null,
      categoryPath: []
    })
  })

  it('should set state for FETCH_PRODUCTS_FAILURE', function () {
    const state = defaultState

    const SuccessState = reducer(state, actionCreators.fetchProductsSuccess(mockData))
    const result = reducer(SuccessState, actionCreators.fetchProductsFailure('Error'))

    expect(result).to.deep.contain({
      data: mockData.results,
      awaitingFetch: false,
      awaitingFetchMore: false,
      fetchSuccess: false,
      fetchFailure: true,
      fetchErrorMessage: 'Error'
    })
  })
})
