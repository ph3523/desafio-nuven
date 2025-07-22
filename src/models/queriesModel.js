const prisma = require('../prisma');

const createQuery = async (data) => {
    return prisma.queries.create({
        data: {
            pergunta: data.pergunta,
            resposta: data.resposta,
            usuario_id: data.usuario_id,
            dataset_id: data.dataset_id
        }
    });
};


const getQueriesByUserId = async (userId) => {
    return prisma.queries.findMany({
        where: {
            usuario_id: userId
        },
        include: {
            datasets: true
        }
    });
};

module.exports = {
    createQuery,
    getQueriesByUserId,
};