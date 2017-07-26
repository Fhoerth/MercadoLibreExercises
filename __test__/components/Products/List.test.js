import { tearUp } from '../../domRegister'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { take, nth } from 'ramda'

import List from '../../../app/components/Products/List'
import Item from '../../../app/components/Products/Item'
import Spinner from '../../../app/components/common/Spinner'

import productsSearchMock from '../../mocks/ipod.search.mock.json'

chai.use(chaiEnzyme())

const mockStore = configureMockStore()

describe('<List />', function () {
  before(tearUp)

  it('should display spinner while awaiting products fetch', function () {
    const store = mockStore({
      products: {
        awaitingFetch: true
      }
    })

    const wrapper = mount(
      <Provider store={store}>
        <List />
      </Provider>
    )

    expect(wrapper).to.contain(<Spinner />)
  })

  it('should render Items', function () {
    const store = mockStore({
      products: {
        awaitingFetch: false,
        data: take(4, productsSearchMock.results)
      }
    })

    const firstProductData = nth(0, store.getState().products.data)
    const lastProductData = nth(3, store.getState().products.data)

    const wrapper = mount(
      <Provider store={store}>
        <List />
      </Provider>
    )

    expect(wrapper).to.contain(<Item product={firstProductData} />)
    expect(wrapper).to.contain(<Item product={lastProductData} />)
  })
})
