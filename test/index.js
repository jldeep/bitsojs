'use strict'

const Bitso = require('./../lib')
const mocha = require('mocha')
const coMocha = require('co-mocha')
const assert = require('assert')

describe('Bitso', function () {
  before(function * () {
    this.bitso = new Bitso({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
      clientId: process.env.CLIENT_ID
    })
  })

  describe('Public Endpoints', function () {
    describe('Ticker', function () {
      it('Should return trading information', function * () {
        try {
          this.body = yield this.bitso.ticker()
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(typeof this.body, 'object')
        assert.equal(typeof this.body.high, 'string')
        assert.equal(typeof this.body.last, 'string')
        assert.equal(typeof this.body.timestamp, 'string')
        assert.equal(typeof this.body.volume, 'string')
        assert.equal(typeof this.body.vwap, 'string')
        assert.equal(typeof this.body.low, 'string')
        assert.equal(typeof this.body.ask, 'string')
        assert.equal(typeof this.body.bid, 'string')
      })
    })

    describe('Order Book', function () {
      it('Should return a list of all open orders', function * () {
        try {
          this.body = yield this.bitso.orderBook()
        }
        catch (e) {
          throw new Error(e)
        }

        assert(Array.isArray(this.body.asks))
        assert(Array.isArray(this.body.bids))
        assert.equal(typeof this.body.asks[0][0], 'string')
        assert.equal(typeof this.body.bids[0][0], 'string')
      })
    })

    describe('Transactions', function () {
      it('Should return a list of recent trades', function * () {
        try {
          this.body = yield this.bitso.transactions()
        }
        catch (e) {
          throw new Error(e)
        }

        assert(Array.isArray(this.body))
        assert.equal(typeof this.body[0].date, 'string')
        assert.equal(typeof this.body[0].tid, 'number')
        assert.equal(typeof this.body[0].price, 'string')
        assert.equal(typeof this.body[0].amount, 'string')
        assert.equal(typeof this.body[0].side, 'string')
      })
    })
  })

  describe('Private Endpoints', function () {
    describe('Account balance', function () {
      it('Should return information of all balances', function * () {
        try {
          this.body = yield this.bitso.accountBalance()
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(typeof this.body.mxn_balance, 'string')
        assert.equal(typeof this.body.btc_balance, 'string')
        assert.equal(typeof this.body.mxn_reserved, 'string')
        assert.equal(typeof this.body.btc_reserved, 'string')
        assert.equal(typeof this.body.mxn_available, 'string')
        assert.equal(typeof this.body.btc_available, 'string')
        assert.equal(typeof this.body.fee, 'string')
      })
    })

    describe('User Transactions', function () {
      it('Should returna list of the user’s transactions', function * () {
        try {
          this.body = yield this.bitso.usertransactions()
        }
        catch (e) {
          throw new Error(e)
        }

        assert(Array.isArray(this.body))
        if(this.body.length > 0) {
          if (this.body[0].datetime) assert.equal(typeof this.body[0].datetime, 'string')
          if (this.body[0].id) assert.equal(typeof this.body[0].id, 'number')
          if (this.body[0].type) assert.equal(typeof this.body[0].type, 'number')
          if (this.body[0].method) assert.equal(typeof this.body[0].method, 'string')
          if (this.body[0].order_id) assert.equal(typeof this.body[0].order_id, 'string')
          if (this.body[0].rate) assert.equal(typeof this.body[0].rate, 'string')
        }
      })
    })

    describe('Open Orders', function () {
      it('Should returna a list of the user’s open orders', function * () {
        try {
          this.body = yield this.bitso.openOrders()
        }
        catch (e) {
          throw new Error(e)
        }

        assert(Array.isArray(this.body))
        if(this.body.length > 0) {
          if (this.body[0].datetime) assert.equal(typeof this.body[0].datetime, 'string')
          if (this.body[0].id) assert.equal(typeof this.body[0].id, 'string')
          if (this.body[0].type) assert.equal(typeof this.body[0].type, 'number')
          if (this.body[0].price) assert.equal(typeof this.body[0].price, 'string')
          if (this.body[0].amount) assert.equal(typeof this.body[0].amount, 'string')
          if (this.body[0].status) assert.equal(typeof this.body[0].status, 'string')
        }
      })
    })

    describe.skip('Lookup Order', function () {
      it('Should returna a list of details for 1 or more orders', function * () {
        try {
          this.body = yield this.bitso.lookupOrder(this.orderId)
        }
        catch (e) {
          throw new Error(e)
        }

        assert(Array.isArray(this.body))
        if (this.body[0].id) assert.equal(typeof this.body[0].id, 'string')
        if (this.body[0].book) assert.equal(typeof this.body[0].book, 'string')
        if (this.body[0].price) assert.equal(typeof this.body[0].price, 'number')
        if (this.body[0].amount) assert.equal(typeof this.body[0].amount, 'string')
        if (this.body[0].type) assert.equal(typeof this.body[0].type, 'string')
        if (this.body[0].status) assert.equal(typeof this.body[0].status, 'string')
        if (this.body[0].created) assert.equal(typeof this.body[0].created, 'string')
        if (this.body[0].updated) assert.equal(typeof this.body[0].updated, 'string')

      })
    })

    describe.skip('Cancel Order', function () {
      it('Should cancel an open order', function * () {
        try {
          this.body = yield this.bitso.cancelOrder(this.orderId)
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(this.body, '"true"')
      })
    })

    describe.skip('Place a Buy Order', function () {
      it('Should place a buy order', function * () {
        try {
          this.body = yield this.bitso.buyOrder('0.01')
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(typeof this.body.id, 'string')
        assert.equal(typeof this.body.book, 'string')
        assert.equal(typeof this.body.datetime, 'string')
        assert.equal(typeof this.body.type, 'string')
        assert.equal(typeof this.body.status, 'string')
        assert.equal(typeof this.body.price, 'string')
        assert.equal(typeof this.body.amount, 'string')
      })
    })

    describe.skip('Place a Sell Order', function () {
      it('Should place a sell order', function * () {
        try {
          this.body = yield this.bitso.sellOrder('0.01')
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(typeof this.body.id, 'string')
        assert.equal(typeof this.body.book, 'string')
        assert.equal(typeof this.body.datetime, 'string')
        assert.equal(typeof this.body.type, 'string')
        assert.equal(typeof this.body.status, 'string')
        assert.equal(typeof this.body.price, 'string')
        assert.equal(typeof this.body.amount, 'string')
      })
    })

    describe('Bitcoin Deposit', function () {
      it('Should get a Bitcoin deposit address to fund your account', function * () {
        try {
          this.body = yield this.bitso.bitcoinDeposit()
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(typeof this.body, 'string')
      })
    })

    describe.skip('Bitcoin Withdrawal', function () {
      it('Should trigger a Bitcoin withdrawal from your account', function * () {
        try {
          this.body = yield this.bitso.bitcoinWithdrawal('0.01', '3CaPt93nYFzapDHMk6zZsXqiD8dJqKjWvb')
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(this.body, '"ok"')
      })
    })

    describe.skip('Ripple Withdrawal', function () {
      it('Should trigger a Ripple withdrawal from your account', function * () {
        try {
          this.body = yield this.bitso.rippleWithdrawal('0.01', 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV')
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(this.body, '"ok"')
      })
    })

    describe.skip('Bank Withdrawal (SPEI)', function () {
      it('Should trigger a SPEI withdrawal from your account', function * () {
        try {
          this.body = yield this.bitso.speiWithdrawal('100', 'Pedro', 'Perez', '032180000118359719', 'AAA', 'BBB')
        }
        catch (e) {
          throw new Error(e)
        }

        assert.equal(this.body, '"ok"')
      })
    })
  })
})

