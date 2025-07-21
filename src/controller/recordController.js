const recordModel = require('../models/recordModel');

const searchRecords = async(req, res) => {
    try {
        const { query } = req.query;

        if(!query || query.trim() === '') {
            return res.status(400).json({ error: "Parâmetro de busca não fornecido" });
        }

        const records = await recordModel.searchRecords(query);

        res.json({ message: `${records.length} registros encontrados`, count: records.length, records });

    } catch (error) {
        console.error("Erro ao buscar registros:", error);
        res.status(500).json({ error: error.message || "Erro ao buscar registros" });
    }
};

module.exports = {
    searchRecords
};