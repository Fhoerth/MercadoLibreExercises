import React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import IndexPage from './pages/index'

const createApp = (store, history) => () => (
  <Provider key='provider' store={store}>
    <ConnectedRouter key='connected-router' history={history}>
      <div key='main'>
        <Route exact path='/' component={IndexPage} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default createApp
