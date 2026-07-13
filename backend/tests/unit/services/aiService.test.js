const aiService = require('../../../services/aiService');

describe('AI Service', () => {
  it('should analyze image', async () => {
    const result = await aiService.analyzeImage('/test/image.png');
    expect(result).toBeDefined();
  });

  it('should analyze video', async () => {
    const result = await aiService.analyzeVideo('/test/video.mp4');
    expect(result).toBeDefined();
  });
});