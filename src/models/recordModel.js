const prisma = require('../prisma');

const createRecords = async (data) => {
    const createdRecords = [];
    for (const recordData of data) {
        const createdRecord = await prisma.records.create({
            data: {
                dataset_id: data.dataset_id,
                dados_json: recordData.dados_json
            }
        });
        createdRecords.push(createdRecord);
    }
    return createdRecords;
};

