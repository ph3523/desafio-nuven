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

/**
 * @swagger
 * /datasets:
 *   post:
 *     summary: Criar um novo dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dataset criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar dataset
 */
router.post('/', createDataset);

/**
 * @swagger
 * /datasets:
 *   get:
 *     summary: Listar todos os datasets do usuário
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de datasets
 *       500:
 *         description: Erro ao listar datasets
 */
router.get('/', listarDataset);

/**
 * @swagger
 * /datasets/{id}:
 *   get:
 *     summary: Obter um dataset específico
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dataset encontrado
 *       404:
 *         description: Dataset não encontrado
 */
router.get('/:id', getDataset);

/**
 * @swagger
 * /datasets/{id}/records:
 *   get:
 *     summary: Obter registros de um dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registros encontrados
 *       404:
 *         description: Dataset não encontrado
 */
router.get('/:id/records', getDatasetRecords);

/**
 * @swagger
 * /datasets/upload:
 *   post:
 *     summary: Fazer upload de arquivo CSV ou PDF para um dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - datasetId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               datasetId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Arquivo processado com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao processar arquivo
 */
router.post('/upload', upload.single('file'), uploadData);

module.exports = router;