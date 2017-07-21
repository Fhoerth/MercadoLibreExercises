import React from 'react'
import styles from './Products.scss'
import Item from './Item'

const List = () => (
  <ol className={styles.list}>
    <li className={styles.listItem}>
      <Item />
    </li>
    <li className={styles.listItem}>
      <Item />
    </li>
  </ol>
)

export default List
