const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `Ressource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate value
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = [];
        for (let key in err.errors) {
            if (err.errors.hasOwnProperty(key)) {
                messages.push(err.errors[key].message);
            }
        }
        const message = messages.join(' ');
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler;