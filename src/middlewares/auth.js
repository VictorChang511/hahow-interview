const axios = require('axios')

const authenticate = async (req, res, next) => {
  const { name, password } = req.headers
  if (name && password) {
    try {
      await axios.post('https://hahow-recruit.herokuapp.com/auth', {
        name,
        password
      })
      req.isLogin = true
      next()
    } catch (error) {
      res.status(error.response.status).send({ error: error.response.data })
    }
  } else {
    req.isLogin = false
    next()
  }
}

module.exports = {
  authenticate
}
