import React from 'react'
import styles from '../../styles/Layout.scss'

export default () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <a className={styles.logo} href="https://www.mercadolibre.com.ar">Mercado Libre - Donde comprar y vender de todo</a>
    </div>
    <button type='submit'>
      <i className={styles.iconSearch} />
    </button>
    <div className={styles.search}>
      <input className={styles.search} type='text' placeholder='Buscar productos' />
    </div>
  </header>
)
