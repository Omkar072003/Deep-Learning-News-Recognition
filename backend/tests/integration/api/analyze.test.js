const request = require('supertest');
const app = require('../../../app');

describe('POST /api/v1/analyze/image', () => {
  it('should analyze uploaded image', async () => {
    const res = await request(app)
      .post('/api/v1/analyze/image')
      .attach('file', 'tests/fixtures/images/test-image.png');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
  });
});