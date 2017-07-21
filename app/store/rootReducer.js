import { combineReducers } from 'redux'
import productsResource from './products'

const rootReducer = combineReducers({
  products: productsResource.reducer
})

export default rootReducer
