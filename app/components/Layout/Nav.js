import React from 'react'
import styles from '../../styles/Layout.scss'

export default () => (
  <nav className={styles.breadcrumb}>
    <ol>
      <li><a href="#">Navigation Bar</a> »</li>
      <li><a href="#" className={styles.active}>Navigation Bar</a></li>
    </ol>
  </nav>
)
