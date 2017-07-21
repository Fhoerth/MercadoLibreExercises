import 'babel-polyfill'
import './styles/App.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import configureStore from './store/configureStore'

const store = configureStore()
const rootEl = document.getElementById('root')

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  )
} else {
  const DevApp = AppComponent => (
    <AppContainer>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </AppContainer>
  )
  const SuperApp = DevApp(App)

  const appInstance = ReactDOM.render(SuperApp, rootEl)

  if (module.hot) {
    const reactDeepForceUpdate = require('react-deep-force-update')
    module.hot.accept('./App', () => {
      reactDeepForceUpdate(appInstance)
    })
  }
}
