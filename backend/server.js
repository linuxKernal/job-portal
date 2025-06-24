const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const AppError = require("./utils/appError");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const cors = require("cors");
const jobPostRoute = require("./routes/JobRoutes");
const errorController = require("./controllers/errorController");

require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn) => console.log("MongoDB successfully connnected"));

const app = express();

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in hour!",
});

app.use(cors());
// app.use(helmet());
// app.use("/api", limiter);
app.use(express.json({ limit: "20kb" }));
// app.use(mongoSanitize());
// app.use(xss());

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/jobs", jobPostRoute);

app.all("/*splat", (req, res, next) => {
    throw new AppError("This route not found", 404);
});

app.use(errorController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`));
