const express = require('express');
const { searchRecords } = require('../controller/recordController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/search', searchRecords);

module.exports = router;