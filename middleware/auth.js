const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//Checar se o usuário esta autenticado
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    //Confirma se o token existe
    if (!token) {
        return next(new ErrorResponse('você tem que logar...', 401))
    }

    try {
        //Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return next(new ErrorResponse('você tem que logar', 401))
    }
}

//Middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.tipo === 'user') {
        return next(new ErrorResponse('Acesso negado, você deve ser um admin', 401))
    }
    next()
}