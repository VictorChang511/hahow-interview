const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://hahow-recruit.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

const getHeroes = async () => {
  const response = await instance.get('/heroes')
  return response.data
}

const getHeroById = async (id) => {
  const response = await instance.get(`/heroes/${id}`)
  return response.data
}

const getProfileById = async (id) => {
  const response = await instance.get(`/heroes/${id}/profile`)
  return response.data
}

module.exports = {
  getHeroes,
  getHeroById,
  getProfileById
}
