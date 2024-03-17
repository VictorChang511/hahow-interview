const { getHeroes, getHeroById, getProfileById } = require('../utils/heroUtils')

const heroesGET = async (req, res) => {
  const heroes = await getHeroes()
  if (!req.isLogin) {
    return res.send(heroes)
  }
  const heroesWithProfile = await Promise.all(
    heroes.map(async (hero) => {
      const profile = await getProfileById(hero.id)
      return { ...hero, profile }
    })
  )
  return res.send(heroesWithProfile)
}

const heroesIdGET = async (req, res) => {
  try {
    const hero = await getHeroById(req.params.heroId)
    if (req.isLogin) {
      const profile = await getProfileById(req.params.heroId)
      hero.profile = profile
    }
    return res.send(hero)
  } catch (error) {
    return res.status(error.response?.status || 500).send({ error: error.response?.data || 'Internal Server Error' })
  }
}

module.exports = {
  heroesGET,
  heroesIdGET
}
