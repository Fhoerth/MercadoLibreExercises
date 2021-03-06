import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styles from '../../styles/Products.scss'

import Item from './Item'
import Spinner from '../common/Spinner'

class List extends React.Component {
  render () {
    if (this.props.awaitingFetch) {
      return (
        <div className={styles.notification}>
          <Spinner />
          <p className={styles.withMargin}>Realizando búsqueda de productos</p>
        </div>
      )
    } else if (this.props.products.length > 0) {
      return (
        <ol className={styles.list}>
          {this.props.products.map(product => {
            return (
              <li key={product.id} className={styles.listItem}>
                <Item product={product} />
              </li>
            )
          })}
        </ol>
      )
    } else {
      return (
        <div className={styles.notification}>
          <p>No se encontraron resultados para su búsqueda.</p>
        </div>
      )
    }
  }
}

List.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  awaitingFetch: PropTypes.bool
}

const ListConnected = connect(
  state => ({
    awaitingFetch: state.products.awaitingFetch,
    fetchSuccess: state.products.fetchSuccess,
    fetchFailure: state.products.fetchFailure,
    products: state.products.data
  })
)(List)

export default ListConnected
