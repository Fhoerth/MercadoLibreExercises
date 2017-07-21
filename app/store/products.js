import { pick, pickBy, compose } from 'ramda'
import { call, takeEvery, put } from 'redux-saga/effects'

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

export const defaultState = {
  data: []
}

export const actionTypes = {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
}

const fetchProducts = ({ q = '', page, productsPerPage, merge = false } = {}) => ({
  type: FETCH_PRODUCTS,
  merge,
  q,
  page,
  productsPerPage
})
const fetchProductsSuccess = products => ({ type: FETCH_PRODUCTS_SUCCESS, products })
const fetchProductsFailure = errorMessage => ({ type: FETCH_PRODUCTS_FAILURE, errorMessage })
export const actionCreators = {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, awaitingFetch: true }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        awaitingFetch: false,
        fetchSuccess: true,
        fetchFailure: false,
        fetchErrorMessage: null,
        data: action.merge ? action.products : action.products
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        awaitingFetch: false,
        fetchSuccess: false,
        fetchFailure: true,
        fetchErrorMessage: action.errorMessage
      }
    default:
      return state
  }
}

export const createSagas = ({ apiFetchProducts }) => {
  function * fetchProducts (action) {
    try {
      const definedParams = compose(
        pickBy(value => value),
        pick(['q', 'page', 'productsPerPage'])
      )(action)

      const products = yield call(apiFetchProducts, definedParams)
      yield put(actionCreators.fetchProductsSuccess(products))
    } catch (e) {
      yield put(actionCreators.fetchProductsFailure(e.message || 'Couldn\'t fetch products'))
    }
  }

  function * fetchProductsWatcher () {
    yield takeEvery(FETCH_PRODUCTS, fetchProducts)
  }

  return {
    fetchProducts,
    fetchProductsWatcher
  }
}

export default {
  defaultState,
  actionTypes,
  actionCreators,
  reducer,
  createSagas
}
