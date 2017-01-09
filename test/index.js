'use strict'

const Bitso = require('./../lib')
const mocha = require('mocha')
const coMocha = require('co-mocha')
const assert = require('assert')

describe('Public Endpoints', function () {
  before(function * () {
    this.bitso = new Bitso()
  })

  describe('Ticker', function () {
    it('Should return trading information', function * () {
      let res = yield this.bitso.ticker()

      assert.equal(typeof res, 'object')
      assert.equal(typeof res.high, 'string')
      assert.equal(typeof res.last, 'string')
      assert.equal(typeof res.timestamp, 'string')
      assert.equal(typeof res.volume, 'string')
      assert.equal(typeof res.vwap, 'string')
      assert.equal(typeof res.low, 'string')
      assert.equal(typeof res.ask, 'string')
      assert.equal(typeof res.bid, 'string')
    })
  })

  describe('Order Book', function () {
    it('Should return a list of all open orders', function * () {
      let res = yield this.bitso.orderBook()

      assert(Array.isArray(res.asks))
      assert(Array.isArray(res.bids))
      assert.equal(typeof res.asks[0][0], 'string')
      assert.equal(typeof res.bids[0][0], 'string')
    })
  })

  describe('Transactions', function () {
    it('Should return a list of recent trades', function * () {
      let res = yield this.bitso.transactions()

      assert(Array.isArray(res))
      assert.equal(typeof res[0].date, 'string')
      assert.equal(typeof res[0].tid, 'number')
      assert.equal(typeof res[0].price, 'string')
      assert.equal(typeof res[0].amount, 'string')
      assert.equal(typeof res[0].side, 'string')
    })
  })    
})