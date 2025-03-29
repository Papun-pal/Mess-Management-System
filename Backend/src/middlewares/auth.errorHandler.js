const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is provided
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        data: null,
        errors: err.errors || [],
    });
};

export default errorHandler;