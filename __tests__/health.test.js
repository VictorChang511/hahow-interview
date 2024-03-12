const app = require('../src/app')
const request = require('supertest')

describe('GET /api/health', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/api/health')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'OK' })
  })
})
