import queryString from 'query-string'
import { or, head, prop, find, propEq, compose, __ } from 'ramda'

export const parseQueryParams = qs => queryString.parse(qs || '') || {}

export const extractCategoryFilter = compose(
  or(__, []),
  prop('path_from_root'),
  or(__, {}),
  head,
  or(__, []),
  prop('values'),
  or(__, {}),
  find(propEq('id', 'category')),
  or(__, []),
  prop('filters'),
  or(__, {})
)

export default {
  parseQueryParams,
  extractCategoryFilter
}
