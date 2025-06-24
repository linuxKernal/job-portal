const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((msg) => msg.message)
            .join(". ");

        return res.status(400).json({
            status: "fail",
            message,
        });
    }
    if (err.name === "CastError") {
        return res.status(400).json({
            status: "fail",
            message: `Invalid ${err.path} ${err.value}`,
        });
    }

    console.log(err);

    res.status(500).json({
        message: "something went very worng.",
    });
};
