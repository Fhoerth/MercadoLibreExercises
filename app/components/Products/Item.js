import React from 'react'
import styles from '../../styles/Products.scss'

const Item = () => (
  <article className={styles.item}>
    <figure className={styles.thumbnail}>
      <a href="#">
        <img src="http://mla-s1-p.mlstatic.com/4122-MLA2544497600_032012-I.jpg" />
      </a>
    </figure>
    <section className={styles.description}>
      <h2>$ 1.980 <address>Capital Federal</address></h2>
      <h1>Apple Ipod Touch 5g 16gb Negro Igual A Nuevo</h1>
      <div className={styles.clear}/>
    </section>
  </article>
)

export default Item
