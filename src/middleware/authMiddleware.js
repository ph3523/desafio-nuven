const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Acesso negado: Token não fornecido ou invalido" });
        }

        const token = authHeader.replace("Bearer ", "");
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return res.status(403).json({ error: "Token invalido ou expirado" });
    }
};

module.exports = authMiddleware;