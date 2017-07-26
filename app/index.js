import 'babel-polyfill'
import './styles/App.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import createApp from './App'
import configureStore from './store/configureStore'

const store = configureStore()
const history = store.history
const rootEl = document.getElementById('root')

const App = createApp(store, history)

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render((
    <App />
  ), rootEl)
} else {
  const renderDevApp = App => ReactDOM.render((
    <AppContainer>
      <App />
    </AppContainer>), rootEl
  )
  renderDevApp(App)

  if (module.hot) {
    // const reactDeepForceUpdate = require('react-deep-force-update')
    module.hot.accept('./App', () => {
      const createApp = require('./App').default
      const NextApp = createApp(store, history)
      renderDevApp(NextApp)
    })
  }
}



// if (process.env.NODE_ENV === 'production') {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     rootEl
//   )
// } else {
//   const DevApp = () => (
//   )
//
//   const SuperApp = DevApp()
//   ReactDOM.render(SuperApp, rootEl)
//
//   if (module.hot) {
//     // const reactDeepForceUpdate = require('react-deep-force-update')
//     module.hot.accept('./App', () => {
//       const nextApp = require('./App').default
//       // reactDeepForceUpdate(nextApp)
//     })
//   }
// }
