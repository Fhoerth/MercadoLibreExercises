import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { all, fork } from 'redux-saga/effects'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import rootReducer from './rootReducer'
import APIClient from '../lib/APIClient'

import productsResource from './products'

export const initialState = {
  products: productsResource.defaultState
}

export default (preloadedState = initialState) => {
  const apiClient = new APIClient(process.env.MERCADO_LIBRE_API_BASE_URL)
  const sagaMiddleware = createSagaMiddleware()
  const productsSagas = productsResource.createSagas({
    apiFetchProducts: apiClient.fetchProducts.bind(apiClient)
  })

  function * rootSagas () {
    yield all([
      fork(productsSagas.fetchProductsWatcher)
    ])
  }

  const history = createHistory()
  const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history))
  const store = createStore(combineReducers({ ...rootReducer, router: routerReducer }), preloadedState, middleware)
  store.history = history

  sagaMiddleware.run(rootSagas)

  return store
}
