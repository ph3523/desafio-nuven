const prisma = require('../prisma');

const createDataset = async (data) => {
    return prisma.datasets.create({
        data: {
            nome: data.nome,
            usuarioId: data.usuarioId
        }
    });
}

module.exports = {
    createDataset
}