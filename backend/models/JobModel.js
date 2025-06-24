const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, "a job post must need title"],
        minLength: [3, "a job post name must greater than or equals 3 letters"],
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "a job post must need description"],
        default: "",
    },
    companyName: {
        type: String,
        required: [true, "a algorithm must contain a porgram"],
    },
    location: {
        type: String,
    },
    jobType: {
        type: String,
        enum: ["fulltime", "parttime", "contract", "internship"],
        required: true,
    },
    applicationDeadline: {
        type: Date,
        required: true,
    },
    minSalary: {
        type: Number,
        required: true,
        min: [1, "Amount must be a positive number."],
    },
    maxSalary: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("jobs", jobPostSchema);
