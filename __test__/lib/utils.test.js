import { expect } from 'chai'

import utils from '../../app/lib/utils'
import celularSearchMock from '../mocks/celular.search.mock.json'
import ipodSearchMock from '../mocks/ipod.search.mock.json'
import appleIpodSearchMock from '../mocks/apple.ipod.search.mock.json'

describe('extractCategoryFilter', function () {
  it('should work', function () {
    const celularResult = utils.extractCategoryFilter(celularSearchMock)

    expect(celularResult).to.deep.equal([{
      id: 'MLA1051', name: 'Celulares y Teléfonos'
    }, {
      id: 'MLA1055', name: 'Celulares y Smartphones'
    }])

    const emptyResult = utils.extractCategoryFilter(null)
    expect(emptyResult).to.deep.equal([])

    const ipodResult = utils.extractCategoryFilter(ipodSearchMock)
    const expectedResult = [{
      id: 'MLA1000', name: 'Electrónica, Audio y Video'
    }, {
      id: 'MLA409810', name: 'Audio'
    }, {
      id: 'MLA1012', name: 'Audio Portátil y Radios'
    }, {
      id: 'MLA6205', name: 'iPod'
    }, {
      id: 'MLA7262', name: 'Reproductores'
    }]

    expect(ipodResult).to.deep.equal(expectedResult)

    const appleIpodResult = utils.extractCategoryFilter(appleIpodSearchMock)
    expect(appleIpodResult).to.deep.equal([])
  })
})
