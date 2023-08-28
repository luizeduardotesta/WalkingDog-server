const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

//Sign up
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail já cadastrado.", 400))
    }
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

//Sign in
exports.signin = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        //Validação
        if (!email) {
            return next(new ErrorResponse("por favor adicione o e-mail", 403))
        }
        if (!senha) {
            return next(new ErrorResponse("por favor adicione a senha", 403))
        }

        //Checar email do usuário
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("usuário não encontrado", 400))
        }

        //Checar senha do usuário
        const identicas = await user.comparaSenha(senha)
        if (!identicas) {
            return next(new ErrorResponse("senha incorreta", 400))
        }

        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken()
    res.status(codeStatus)
        //Token com durtação de 1 dia(24horas)
        .cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            id: user._id,
            tipo: user.tipo
        })
}

//Log out
exports.logout = async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}

//User profile
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({
        success: true,
        user
    })
}