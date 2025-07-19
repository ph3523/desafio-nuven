const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.users.create({
        data: {
            nome: data.nome,
            email: data.email,
            senha_hash: hashedPassword
        },
    });
};

const getUserByEmail = async (email) => {
    return prisma.users.findUnique({
        where: { email }
    });
}

module.exports = {
    createUser
};