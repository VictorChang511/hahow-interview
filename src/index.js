const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 8000
app.listen(PORT || 8000, () => {
  console.log(`Server is running on port ${PORT}`)
})
