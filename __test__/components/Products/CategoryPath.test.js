import { tearUp } from '../../domRegister'
import React from 'react'

import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai'
import { mount } from 'enzyme'
import { extractCategoryFilter } from '../../../app/lib/utils'

import CategoryPath from '../../../app/components/Products/CategoryPath'
import celularSearch from '../../mocks/celular.search.mock.json'

chai.use(chaiEnzyme())

describe('<CategoryPath />', function () {
  before(tearUp)

  it('should display navigation path', function () {
    const categoryPath = extractCategoryFilter(celularSearch)
    const wrapper = mount(<CategoryPath categoryPath={categoryPath} />)

    expect(
      wrapper.contains([
        <li key='MLA1051'><a href='#'>Celulares y Teléfonos</a> »</li>,
        <li key='MLA1055'><a href='#'>Celulares y Smartphones</a></li>
      ])
    ).to.equal(true)
  })
})
