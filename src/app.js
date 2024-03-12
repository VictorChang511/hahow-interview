const express = require('express')
const app = express()

app.get('/api/health', (req, res) => {
  res.send({ message: 'OK' })
})

module.exports = app
