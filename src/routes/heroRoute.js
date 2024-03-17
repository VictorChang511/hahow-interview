const { Router } = require('express')
const { heroesGET, heroesIdGET } = require('../controllers/heroController')

const heroRoute = new Router()

heroRoute.get('', async (req, res) => heroesGET(req, res))
heroRoute.get('/:heroId', async (req, res) => heroesIdGET(req, res))

module.exports = heroRoute
