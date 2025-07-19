const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await User.createUser(userData);
        res.status(201).json({  message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: error.message || 'Erro ao criar usuário'})
    }
};