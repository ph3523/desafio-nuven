const express = require('express');
const { createDataset, listarDataset, getDataset, getDatasetRecords, uploadData } = require('../controller/datasetController');
const authMiddleware = require('../middleware/authMiddleware');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/uploadMiddleware');


const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();

router.use(authMiddleware);

router.post('/', createDataset);
router.get('/', listarDataset);
router.get('/:id', getDataset);
router.get('/:id/records', getDatasetRecords);
router.post('/upload', upload.single('file'), uploadData);

module.exports = router