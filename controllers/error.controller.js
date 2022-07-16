
const globalErrorHandler = (err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    console.log(err);
    res.status(statusCode).json({
        status: 'Fail',
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

module.exports = { globalErrorHandler };