const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

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