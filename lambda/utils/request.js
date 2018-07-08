const fetch = require('node-fetch')

const requestJson = url => fetch(url).then(res => res.json())

module.exports = { requestJson }
