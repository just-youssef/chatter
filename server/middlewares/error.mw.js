const ErrorMW = (err, req, res, nxt) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    const error = {
        statusCode,
        message,
        path: err.stack.split("at ")[1].trim(),
    }
    console.log(error);

    return res.status(statusCode).json({ error });
}

export default ErrorMW;