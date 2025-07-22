const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.senha_hash, 10);
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

const getUserById = async (id) => {
    return prisma.users.findUnique({
        where: { id }
    });

}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
};