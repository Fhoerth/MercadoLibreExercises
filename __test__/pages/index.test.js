import { tearUp } from '../domRegister'

import React from 'react'
import configureMockStore from 'redux-mock-store'

import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import IndexPage from '../../app/pages/index'
import { actionCreators } from '../../app/store/products'

chai.use(chaiEnzyme())

const mockStore = configureMockStore()

describe('<Index /> Page Component', function () {
  before(tearUp)

  it('should perform initial products search if queryString contains title', function () {
    const LOCATION_TITLE_PARAM = 'ipod'
    const store = mockStore({
      products: {
        awaitingFetch: false,
        data: []
      },
      router: {
        location: {
          search: `?title=${LOCATION_TITLE_PARAM}`
        }
      }
    })

    mount(
      <Provider store={store}>
        <IndexPage />
      </Provider>
    )

    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()).to.deep.equal([actionCreators.fetchProducts({
      q: LOCATION_TITLE_PARAM
    })])
  })
})
