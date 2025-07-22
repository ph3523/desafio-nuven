const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const pdf = require('pdf-parse');
const datasetModel = require('../models/datasetModel');
const recordModel = require('../models/recordModel');

const createDataset = async (req, res) => {
    try {
        const { nome } = req.body;
        const usuario_id = req.user.id;

        if(!nome) {
            return res.status(400).json({error: "Nome do dataset é obrigatório."});
        }

        const dataset = await datasetModel.createDataset({
            nome,
            usuario_id
        });

        res.status(201).json({ message: "Dataset criado com sucesso.", dataset });

    } catch (error) {
        console.error("Erro ao criar dataset:", error);
        res.status(500).json({ error: error.message || "Erro ao criar dataset." });
    }
};

const listarDataset = async(req, res) =>{
    try {
        const usuario_id = req.user.id;
        const datasets = await datasetModel.getDatasetByUserId(usuario_id);

        res.json(datasets);
    } catch (error) {
        console.error('Erro ao listar datasets:', error);
        res.status(500).json({ error: error.message || "Erro ao listar datasets." });
    }
};

const getDataset = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.user.id;

        const dataset = await datasetModel.getDatasetById(parseInt(id));

        if(!dataset) {
            return res.status(404).json({ error: "Dataset não encontrado." });
        }

        if(dataset.usuario_id !== usuario_id) {
            return res.status(403).json({ error: "Acesso negado." });
        }

        res.json(dataset);
    } catch (error) {
        console.error("Erro ao obter dataset:", error);
        res.status(500).json({ error: error.message || "Erro ao obter dataset." });
    }
};

const getDatasetRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.user.id;

        const dataset = await datasetModel.getDatasetById(parseInt(id));

        if(!dataset) {
            return res.status(404).json({ error: "Dataset não encontrado." });
        }

        if(dataset.usuario_id !== usuario_id) {
            return res.status(403).json({ error: "Acesso negado." });
        }

        const records = await recordModel.getRecordsByDatasetId(dataset.id);
        res.json(records);

    } catch (error) {
        console.error("Error ao obter registros do dataset:", error);
        res.status(500).json({ error: error.message || "Erro ao obter registros do dataset." });
    }
};

const processCsv = async (filePath, userId) => {

    try {
        const fileStats = fs.statSync(filePath);
        const fileName = path.basename(filePath);

        return new Promise((resolve, reject) => {
            const results = [];
    
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    const metadata = {
                        dados: results,
                        metadados: {
                            nome: fileName,
                            tamanho: fileStats.size,
                            data: new Date(fileStats.mtime).toISOString(),
                            usuario: userId || "Sistema"
                        }
                    };
                    resolve(metadata);
                })
                .on('error', (error) => reject(error));
        });
    } catch (error) {
        throw new Error(`Erro ao processar CSV: ${error.message}`);
    }
};

const processPdf = async (filePath, userId) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);

        const fileStats = fs.statSync(filePath);
        const fileName = path.basename(filePath);

        return [{
            conteudo: pdfData.text,
            metadados: {
                nome: fileName,
                tamanho: fileStats.size,
                data: new Date(fileStats.mtime).toISOString(),
                usuario: userId || "Sistema"
            }
        }];
    } catch (error) {
        throw new Error(`Erro ao processar PDF: ${error.message}`);
    }
};

const uploadData = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Arquivo não enviado." });
        }

        const datasetId = req.body.datasetId;
        
        if (!datasetId) {
            return res.status(400).json({ error: "ID do dataset não fornecido" });
        }

        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        const usuario_id = req.user.id;

        const dataset = await datasetModel.getDatasetById(parseInt(datasetId));

        if(!dataset) {
            fs.unlinkSync(filePath);
            return res.status(404).json({ error: "Dataset não encontrado" })
        }

        if(dataset.usuario_id !== usuario_id) {
            fs.unlinkSync(filePath);
            return res.status(403).json({ error: "Acesso negado" });
        }

        let dados;

        if(fileExt === ".csv") {
            dados = await processCsv(filePath, usuario_id);

        } else if (fileExt === ".pdf") {
            dados = await processPdf(filePath, usuario_id);
        }

        let recordsToInsert;

        if(fileExt === ".csv") {
            recordsToInsert = [{
                dataset_id: parseInt(datasetId),
                dados_json: dados
            }];
        } else {
            recordsToInsert = dados.map(item => ({
                dataset_id: parseInt(datasetId),
                dados_json: item
            }));
        }

        const insertedRecords = await recordModel.createRecords(recordsToInsert);

        // fs.unlinkSync(filePath);

        res.status(201).json({ message: `Arquivo processado com sucesso: ${insertedRecords.length} registros criados`, records: insertedRecords.length});
    } catch (error) {
        console.error("Error ao processar arquivo: ", error);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ error: error.message || "Erro ao processar arquivo"})
    }
};

module.exports = {
    createDataset,
    listarDataset,
    getDataset,
    getDatasetRecords,
    uploadData
};