
/* global fetch:false */
class HttpConnector {

  get (url) {
    return fetch(url)
  }

  post (url, body) {
    return fetch(url, this._config('POST', body))
  }

  delete (url) {
    return fetch(url, this._config('DELETE', undefined))
  }

  put (url, body) {
    return fetch(url, this._config('PUT', body))
  }

  _config (method, body) {
    return {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export default new HttpConnector()
