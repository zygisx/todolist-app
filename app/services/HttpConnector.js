
/* global fetch:false */
class HttpConnector {

  get (url) {
    return fetch(url).then(this._checkStatus)
  }

  post (url, body) {
    return fetch(url, this._config('POST', body)).then(this._checkStatus)
  }

  delete (url) {
    return fetch(url, this._config('DELETE', undefined)).then(this._checkStatus)
  }

  put (url, body) {
    return fetch(url, this._config('PUT', body)).then(this._checkStatus)
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

  _checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.bodyPromise = response.json()
      throw error
    }
  }
}

export default new HttpConnector()
