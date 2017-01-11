'use strict'

const url = 'https://api.bitso.com/v2'

class API {
  constructor (opts) {
    if (opts) {
    this.apiKey = opts.apiKey
    this.apiSecret = opts.apiSecret
    this.clientId = opts.clientId
    }
    this.url = url
  }
}

module.exports = API