const express = require('express');
const { createQuery, listarQueries } = require('../controller/queriesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createQuery);

router.get('/', listarQueries);

module.exports = router;