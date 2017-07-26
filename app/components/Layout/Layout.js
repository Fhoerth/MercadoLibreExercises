import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../styles/Layout.scss'

import Header from './Header'

const Layout = ({ children }) => (
  <main>
    <Header />
    <div className={styles.wrapper}>
      {children}
    </div>
  </main>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
