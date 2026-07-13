const { processImage } = require('../../../utils/helpers/imageProcessor');

describe('Image Processor', () => {
  it('should process image buffer', async () => {
    const buf = await processImage('/test/image.png');
    expect(buf).toBeInstanceOf(Buffer);
  });
});