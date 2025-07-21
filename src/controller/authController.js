const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) =>{
    try {
        const userData = req.body;

        const newUser = await userModel.createUser(userData);
        res.status(201).json({ user: newUser, message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: error.message || 'Erro ao criar usuário' });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha_hash } = req.body;

        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isSenhaValid = await bcrypt.compare(senha_hash, user.senha_hash);
        if (!isSenhaValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            id: user.id,
            email: user.email,
            nome: user.nome
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: error.message || 'Erro ao fazer login' });
    }
};

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({
            id: user.id,
            nome: user.nome,
            email: user.email
        });
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: error.message || 'Erro ao obter usuário' });

    }
};

module.exports = {
    register,
    login,
    getMe
};