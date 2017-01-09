'use strict'

const API = require('./api')
const request = require('request')

class Bitso extends API {

  /**
  * @memberof Bitso
  * @param {String} book - Specifies which book to use
  */
  ticker (book) {
    this.book = book || 'btc_mxn'
    let url = this.url + '/ticker?book=' + this.book
    return new Promise(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  /**
  * @memberof Bitso
  * @param {String} book - Specifies which book to use
  * @param {String} group - Group orders with the same price (0 - false; 1 - true)
  */
  orderBook (book, group) {
    this.book = book || 'btc_mxn'
    this.group = group || '1'
    let url = this.url + '/order_book?book=' + this.book + '&group=' + this.group
    return new Promise(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  /**
  * @memberof Bitso
  * @param {String} book - Specifies which book to use
  * @param {String} time - Time frame for transaction export (“minute” - 1 minute, “hour” - 1 hour)
  */
  transactions (book, time) {
    this.book = book || 'btc_mxn'
    this.time = time || 'hour'
    let url = this.url + '/transactions?book=' + this.book + '&time=' + this.time
    return new Promise(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }
}

module.exports = Bitso