//error handling
exports.ApiError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail";
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.status
    })
}

exports.MapError = (status, msg, next) => {
    let error = Error();
    error.status = msg;
    error.statusCode = status;
    next(error);
}