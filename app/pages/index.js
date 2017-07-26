import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'

import Layout from '../components/Layout/Layout'
import ProductList from '../components/Products/List'
import CategoryPath from '../components/Products/CategoryPath'

import { actionCreators } from '../store/products'

import layoutStyles from '../styles/Layout.scss'

class IndexPage extends React.Component {
  componentWillMount () {
    const queryParams = queryString.parse(this.props.router.location.search || '')

    if (queryParams.title) {
      // Fetch initial products.
      this.props.searchProducts({
        q: queryParams.title
      })
    }
  }

  render () {
    return (
      <Layout>
        <CategoryPath />
        <section className={layoutStyles.mainSection}>
          <ProductList />
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  router: PropTypes.object,
  searchProducts: PropTypes.func
}

const IndexPageConnected = connect(
  state => ({
    router: state.router
  }),
  dispatch => ({
    searchProducts: options => dispatch(actionCreators.fetchProducts(options))
  })
)(IndexPage)

export default IndexPageConnected
