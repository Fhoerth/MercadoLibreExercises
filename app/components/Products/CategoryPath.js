import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Products.scss'

const CategoryPath = ({ categoryPath }) => {
  return (
    <nav className={styles.breadcrumb} role='navigation'>
      <ol>
        {categoryPath.map((category, index) => {
          return (
            <li key={category.id}><a href="#">{category.name}</a>{ (index < categoryPath.length - 1) ? ' »' : null }</li>
          )
        })}
      </ol>
    </nav>
  )
}

CategoryPath.propTypes = {
  categoryPath: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }))
}

export default CategoryPath
