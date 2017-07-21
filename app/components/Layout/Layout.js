import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Nav from './Nav'
import layout from './Layout.scss'

const Layout = ({ children }) => (
  <main>
    <Header />
    <Nav />
    <section className={layout.wrapper}>
      {children}
    </section>
  </main>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
