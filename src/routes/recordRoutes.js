const express = require('express');
const { searchRecords } = require('../controller/recordController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Buscar registros por texto
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Texto para busca nos registros
 *     responses:
 *       200:
 *         description: Registros encontrados
 *       400:
 *         description: Parâmetro de busca não fornecido
 *       500:
 *         description: Erro ao buscar registros
 */
router.get('/', searchRecords);

module.exports = router;