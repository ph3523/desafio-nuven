const prisma = require('../prisma');

const createDataset = async (data) => {
    return prisma.datasets.create({
        data: {
            nome: data.nome,
            usuario_id: data.usuario_id
        }
    });
};

const getDatasetByUserId = async (usuario_id) => {
    return prisma.datasets.findMany({
        where: {
            usuario_id: usuario_id
        }
    });
};

const getDatasetById = async (id) => {
    return prisma.datasets.findUnique({
        where: { id },
        include: {
            usuario: true,
            records: true
        }
    });
};

module.exports = {
    createDataset,
    getDatasetById,
    getDatasetByUserId
}