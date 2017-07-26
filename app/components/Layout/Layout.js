import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../styles/Layout.scss'

import Header from './Header'

const Layout = ({ children }) => (
  <div>
    <Header />
    <main className={styles.wrapper} role='main'>
      {children}
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
