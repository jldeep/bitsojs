'use strict'

const request = require('request')
const crypto = require('crypto')
const isJSON = require('is-json')

const url = 'https://api.bitso.com/v2'

class Bitso {

  constructor (opts) {
    if(opts) {
      this.apiKey = opts.apiKey
      this.apiSecret = opts.apiSecret
      this.clientId = opts.clientId
    }

    this.url = url

    // Creating and Signing Requests
    this.signing = function () {
      let nonce = new Date().getTime()
      let nonceData = nonce + this.clientId + this.apiKey
      let signature = crypto.createHmac('sha256', this.apiSecret).update(nonceData).digest('hex')

      return {
        key: this.apiKey,
        signature: signature,
        nonce: nonce
      }
    }
  }

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
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
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
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
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
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  /**
  * @memberof Bitso
  */
  accountBalance () {
    let url = this.url + '/balance'
    let data = this.signing()

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  usertransactions(offset, limit, sort, book) {
    this.offset = offset || '0'
    this.limit = limit || '100'
    this.sort = sort || 'desc'
    this.book = book || 'btc_mxn'
    let url = this.url + '/user_transactions'
    let data = this.signing()
    data.offset = this.offset
    data.limit = this.limit
    data.sort = this.sort
    data.book = this.book

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  openOrders(book) {
    this.book = book || 'btc_mxn'
    let data = this.signing()
    data.book = this.book
    let url = this.url + '/open_orders'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          body = JSON.parse(body)
          if(body.error) reject(body)
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  lookupOrder(orderId) {
    let data = this.signing()
    this.orderId = orderId
    data.id = this.orderId
    let url = this.url + '/lookup_order'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(err)
        }
      })
    })
  }

  cancelOrder(orderId) {
    let data = this.signing()
    this.orderId = orderId
    data.id = this.orderId
    let url = this.url + '/lookup_order'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  buyOrder(amount, book, price) {
    let data = this.signing()
    this.book = book || 'btc_mxn'
    this.amount = amount
    this.price = price
    data.book = this.book
    data.amount = this.amount
    if (this.price) data.price = this.price
    let url = this.url + '/buy'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  sellOrder(amount, book, price) {
    let data = this.signing()
    this.book = book
    this.amount = amount
    this.price = price
    data.book = this.book
    data.amount = this.amount
    data.price = this.price
    let url = this.url + '/sell'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  bitcoinDeposit() {
    let data = this.signing()
    let url = this.url + '/bitcoin_deposit_address'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'application/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  bitcoinWithdrawal(amount, address) {
    this.amount = amount
    this.address = address
    let data = this.signing()
    data.amount = this.amount
    data.address = this.address
    let url = this.url + '/bitcoin_withdrawal'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'applicat  ion/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  rippleWithdrawal(amount, address) {
    this.amount = amount
    this.address = address
    let data = this.signing()
    data.amount = this.amount
    data.address = this.address
    let url = this.url + '/ripple_withdrawal'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'applicat  ion/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }

  speiWithdrawal(amount, recipientGivenNames, recipientFamilyNames, clabe, notesRef, numeric_ref) {
    this.amount = amount
    this.recipientGivenNames = recipientGivenNames
    this.recipientFamilyNames = recipientFamilyNames
    this.clabe = clabe
    this.notesRef = notesRef
    this.numeric_ref = numeric_ref
    let data = this.signing()
    data.amount = this.amount
    data.recipient_given_names = this.recipientGivenNames
    data.recipient_family_names = this.recipientFamilyNames
    data.clabe = this.clabe
    data.notes_ref = this.notesRef
    data.numeric_ref = this.numeric_ref
    let url = this.url + '/spei_withdrawal'

    return new Promise(function (resolve, reject) {
      request.post({
        headers: {'content-type':'applicat  ion/json'},
        url: url,
        form: data
      }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
          if (isJSON(body)) {
            body = JSON.parse(body)
            if(body.error) reject(body)
          }
          resolve(body)
        } else {
          reject(JSON.parse(err))
        }
      })
    })
  }
}

module.exports = Bitso