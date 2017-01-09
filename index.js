'use strict'

const request = require('request')

request('https://api.bitso.com/api/v2/ticker?book=btc_mxn', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    } else {
        console.log(err)
    }
})