import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import APIClient from '../lib/APIClient'

import productsResource from './products'

export const initialState = {
  products: productsResource.defaultState
}

export default (prelodedState = initialState) => {
  const apiClient = new APIClient('http://google.com.ar')
  const sagaMiddleware = createSagaMiddleware()
  const productsSagas = productsResource.createSagas({
    apiFetchProducts: apiClient.fetchProducts.bind(this)
  })

  function * rootSagas () {
    yield all([
      fork(productsSagas.fetchProductsWatcher)
    ])
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  const store = createStore(rootReducer, prelodedState, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSagas)

  return store
}
