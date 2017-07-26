import axios from 'axios'

export const fallbackErrorMessage = 'There was an error while trying to fetch products data'

export function APIError (error) {
  this.name = 'APIError'
  this.message = error.message || fallbackErrorMessage
}

class APIClient {
  constructor (baseURL) {
    this.client = axios.create({
      baseURL
    })
  }

  handleError (error) {
    throw new APIError(error)
  }

  fetchProducts ({ q, page = 1, productsPerPage = 4 }) {
    const limit = productsPerPage
    const offset = (page - 1) * productsPerPage

    return this.client.get(
      `/search?q=${q}&limit=${limit}&offset=${offset}`
    ).then(result => {
      return result.data
    }).catch(this.handleError.bind(this))
  }
}

export default APIClient
