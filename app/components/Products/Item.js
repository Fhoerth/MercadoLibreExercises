import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Products.scss'

const Item = ({ product }) => (
  <article className={styles.item} role='document'>
    <figure className={styles.thumbnail} role='img'>
      <a href={product.permalink} target='_blank'>
        <img src={product.thumbnail} />
      </a>
    </figure>
    <section className={styles.description}>
      <h2 role='description'>$ {product.price} <address>{product.address.state_name}</address></h2>
      <h1><a href={product.permalink} target='_blank' role='link'>{product.title}</a></h1>
      <div className={styles.clear}/>
    </section>
  </article>
)

Item.propTypes = {
  product: PropTypes.object
}

export default Item
