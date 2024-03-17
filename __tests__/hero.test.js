const request = require('supertest')
const app = require('../src/app')

jest.mock('../src/middlewares/auth', () => ({
  authenticate: jest.fn()
}))

jest.mock('../src/utils/heroUtils', () => ({
  getHeroes: jest.fn(),
  getHeroById: jest.fn(),
  getProfileById: jest.fn()
}))

const { authenticate } = require('../src/middlewares/auth')
const { getHeroes, getHeroById, getProfileById } = require('../src/utils/heroUtils')

describe('GET /heroes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 and a list of heroes if user is not logged in.', async () => {
    authenticate.mockImplementation((req, res, next) => {
      req.isLogin = false
      next()
    })
    const heroes = [
      { id: '1', name: 'HeroA', image: 'https://www.heroes.com/HeroA' },
      { id: '2', name: 'HeroB', image: 'https://www.heroes.com/HeroB' }
    ]
    getHeroes.mockResolvedValue(heroes)
    const res = await request(app).get('/heroes')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(heroes)
  })

  it('should return 200 and a list of heroes with profile if user is logged in.', async () => {
    authenticate.mockImplementation((req, res, next) => {
      req.isLogin = true
      next()
    })
    const heroes = [
      { id: '1', name: 'HeroA', image: 'https://www.heroes.com/HeroA' },
      { id: '2', name: 'HeroB', image: 'https://www.heroes.com/HeroB' }
    ]
    const heroesWithProfile = [
      { id: '1', name: 'HeroA', image: 'https://www.heroes.com/HeroA', profile: { str: 1, int: 1, agi: 1, luk: 1 } },
      { id: '2', name: 'HeroB', image: 'https://www.heroes.com/HeroB', profile: { str: 1, int: 1, agi: 1, luk: 1 } }
    ]
    getHeroes.mockResolvedValue(heroes)
    getProfileById.mockResolvedValue({ str: 1, int: 1, agi: 1, luk: 1 })
    const res = await request(app)
      .get('/heroes')
      .set('Name', 'test')
      .set('Password', 'test')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(heroesWithProfile)
  })

  it('should return 401', async () => {
    authenticate.mockImplementation((req, res, next) => {
      res.status(401).send('Unauthorized')
    })
    const res = await request(app).get('/heroes')
    expect(res.statusCode).toBe(401)
  })
})

describe('GET /heroes/:heroId', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 and a hero', async () => {
    authenticate.mockImplementation((req, res, next) => {
      req.isLogin = false
      next()
    })
    const hero = { id: '1', name: 'HeroA', image: 'https://www.heroes.com/HeroA' }
    getHeroById.mockResolvedValue(hero)
    const res = await request(app).get('/heroes/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(hero)
  })

  it('should return 200 and a hero with profile', async () => {
    authenticate.mockImplementation((req, res, next) => {
      req.isLogin = true
      next()
    })
    const hero = { id: '1', name: 'HeroA', image: 'https://www.heroes.com/HeroA' }
    const heroWithProfile = { ...hero, profile: { str: 1, int: 1, agi: 1, luk: 1 } }
    getHeroById.mockResolvedValue(hero)
    getProfileById.mockResolvedValue({ str: 1, int: 1, agi: 1, luk: 1 })
    const res = await request(app).get('/heroes/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(heroWithProfile)
  })

  it('should return 404', async () => {
    authenticate.mockImplementation((req, res, next) => {
      req.isLogin = false
      next()
    })
    getHeroById.mockRejectedValue({ response: { status: 404, data: 'Not Found' } })
    const res = await request(app).get('/heroes/1')
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ error: 'Not Found' })
  })

  it('should return 401', async () => {
    authenticate.mockImplementation((req, res, next) => {
      res.status(401).send('Unauthorized')
    })
    const res = await request(app).get('/heroes/1')
    expect(res.statusCode).toBe(401)
  })
})
