import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../styles/Layout.scss'

import Header from './Header'
import Nav from './Nav'

const Layout = ({ children }) => (
  <main>
    <Header />
    <Nav />
    <section className={styles.wrapper}>
      {children}
    </section>
  </main>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
