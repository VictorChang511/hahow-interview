const express = require('express')
const app = express()
const { authenticate } = require('./middlewares/auth')

app.get('/api/health', (req, res) => {
  res.send({ message: 'OK' })
})

app.use('/heroes', authenticate, require('./routes/heroRoute'))

module.exports = app
