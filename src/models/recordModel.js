const prisma = require('../prisma');

const createRecords = async (data) => {
    const createdRecords = [];
    for (const recordData of data) {
        const createdRecord = await prisma.records.create({
            data: {
                dataset_id: recordData.dataset_id,
                dados_json: recordData.dados_json
            }
        });
        createdRecords.push(createdRecord);
    }
    return createdRecords;
};

const getRecordsByDatasetId = async (datasetId) => {
    return prisma.records.findMany({
        where: {
            dataset_id: datasetId
        }
    });
}

const searchRecords = async (query, limit = 50) => {
    return prisma.$queryRaw`
        SELECT r.*, d.nome as dataset_nome 
        FROM "Records" r
        JOIN "Datasets" d ON r.dataset_id = d.id
        WHERE r.dados_json::text ILIKE ${`%${query}%`}
        LIMIT ${limit}
    `;
};

module.exports = {
    createRecords,
    getRecordsByDatasetId,
    searchRecords
};