const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

exports.extractFrames = (videoPath, outputDir, cb) => {
  ffmpeg(videoPath)
    .on('end', () => cb(null, outputDir))
    .on('error', (err) => cb(err))
    .screenshots({
      count: 10,
      folder: outputDir,
      filename: 'frame-%00i.png',
      size: '320x240'
    });
};