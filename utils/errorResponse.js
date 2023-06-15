function ErrorResponse(message, codeStatus) {
    const error = new Error(message);
    error.codeStatus = codeStatus;
    return error;
}

module.exports = ErrorResponse;