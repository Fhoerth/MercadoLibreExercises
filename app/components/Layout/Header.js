import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { actionCreators } from '../../store/products'

import styles from '../../styles/Layout.scss'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      q: null,
      merge: false
    }
  }

  performSearch (e) {
    e.preventDefault()
    if (this.state.q) {
      this.props.updateQuerystringTitle(this.state.q)
      this.props.searchProducts(this.state)
    }
  }

  handleChange (e) {
    this.setState({
      q: e.target.value || null
    })
  }

  render () {
    return (
      <header className={styles.header}>
        <form onSubmit={this.performSearch.bind(this)}>
          <div className={styles.logo}>
            <a className={styles.logo} href="https://www.mercadolibre.com.ar">Mercado Libre - Donde comprar y vender de todo</a>
          </div>
          <button type='submit' onClick={this.performSearch.bind(this)}>
            <i className={styles.iconSearch} />
          </button>
          <div className={styles.search}>
            <input className={styles.search} onChange={this.handleChange.bind(this)} type='text' placeholder='Buscar productos' />
          </div>
        </form>
      </header>
    )
  }
}

Header.propTypes = {
  searchProducts: PropTypes.func,
  updateQuerystringTitle: PropTypes.func
}

const HeaderConnected = connect(
  null,
  dispatch => ({
    updateQuerystringTitle: title => dispatch(push(`/?title=${title}`)),
    searchProducts: options => dispatch(actionCreators.fetchProducts(options))
  })
)(Header)

export default HeaderConnected
