const queryModel = require('../models/queriesModel');
const datasetModel = require('../models/datasetModel');
const fs = require('fs');
const path = require('path');

const mockRespostas = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '../data/mockResponse.json'),
        'utf8'
    )
);

const mockIAResponse = (pergunta) => {
    const perguntaLowerCase = pergunta.toLowerCase();

    for (const item of mockRespostas.palavrasChave) {
        if (perguntaLowerCase.includes(item.chave.toLowerCase())) {
            return item.resposta;
        }
    }
    return mockRespostas.respostaDefault;
};

const createQuery = async (req, res) => {
    try {
        const { pergunta, datasetId } = req.body;

        const usuario_id = req.user.id;

        if (!pergunta || !datasetId) {
            return res.status(400).json({ error: "Pergunta e datasetId são obrigatórios." });
        }

        const dataset = await datasetModel.getDatasetById(parseInt(datasetId));

        if (!dataset) {
            return res.status(404).json({ error: "Dataset não encontrado." });
        }

        if (dataset.usuario_id !== usuario_id) {
            return res.status(403).json({ error: "Acesso negado a este dataset." });
        }

        const resposta = mockIAResponse(pergunta);

        const query = await queryModel.createQuery({
            usuario_id,
            dataset_id: parseInt(datasetId),
            pergunta,
            resposta
        });

        res.status(201).json({ message: "Consulta registrada com sucesso.", query });

    } catch (error) {
        console.error("Erro ao processar consulta:", error);
        res.status(500).json({ error: error.message || "Erro ao processar consulta." });
    }
};


const listarQueries = async (req, res) => {
    try {
        const usuario_id = req.user.id;

        const queries = await queryModel.getQueriesByUserId(usuario_id);

        const formattedQueries = queries.map(query => ({
            id: query.id,
            pergunta: query.pergunta,
            resposta: query.resposta,
            dataset: query.dataset_id,
            dataset_id: query.dataset_id,
            data: query.criado_em
        }));

        res.json({ message: "Consultas recuperadas com sucesso.", queries: formattedQueries });
    } catch (error) {
        console.error("Erro ao listar consultas:", error);
        res.status(500).json({ error: error.message || "Erro ao listar consultas." });
    }
}

module.exports = {
    createQuery,
    listarQueries
};