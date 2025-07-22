const express = require('express');
const { createQuery, listarQueries } = require('../controller/queriesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Criar uma nova consulta à IA mock
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pergunta
 *               - datasetId
 *             properties:
 *               pergunta:
 *                 type: string
 *               datasetId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Consulta registrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao processar consulta
 */
router.post('/', createQuery);

/**
 * @swagger
 * /queries:
 *   get:
 *     summary: Listar histórico de consultas
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consultas
 *       500:
 *         description: Erro ao listar consultas
 */
router.get('/', listarQueries);

module.exports = router;