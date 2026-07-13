const db = require('../../../config/database');

describe('Database Connection', () => {
  it('connects to database', () => {
    expect(db).toBeDefined();
  });
});