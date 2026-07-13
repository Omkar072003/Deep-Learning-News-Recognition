const fs = require('fs');
const https = require('https');

const modelUrls = [
  { url: 'https://tfhub.dev/pretrained/cnn_model.json', file: '../backend/data/models/trained/cnn_model.json' },
  { url: 'https://tfhub.dev/pretrained/rnn_model.json', file: '../backend/data/models/trained/rnn_model.json' }
];

modelUrls.forEach(({ url, file }) => {
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(file));
    console.log(`${file} downloaded`);
  });
});