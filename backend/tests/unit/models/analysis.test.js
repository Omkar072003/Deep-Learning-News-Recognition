const Analysis = require('../../../models/entities/Analysis');

describe('Analysis Model', () => {
  it('should create analysis entry', async () => {
    const result = await Analysis.create({
      type: 'image',
      filePath: '/test/image.png',
      result: { obj: 'car' }
    });
    expect(result).toHaveProperty('id');
    expect(result.type).toBe('image');
  });

  it('should fetch all analyses', async () => {
    const analyses = await Analysis.findAll();
    expect(Array.isArray(analyses)).toBe(true);
  });
});