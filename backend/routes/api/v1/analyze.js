const express = require('express');
const router = express.Router();
const fileUpload = require('../../../middleware/fileUpload');
const validation = require('../../../middleware/validation');
const { analyzeImageContent, analyzeVideoContent } = require('../../../controllers/analyzeController');

router.post('/image', fileUpload, validation, analyzeImageContent);
router.post('/video', fileUpload, validation, analyzeVideoContent);

module.exports = router;