const JobPost = require("../models/JobModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createJobPost = catchAsync(async (req, res) => {
    console.log(req.body);

    const newJobPost = await JobPost.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            jobPost: newJobPost,
        },
    });
});

exports.getJobPost = catchAsync(async (req, res) => {
    const jobPosts = await JobPost.find({}).sort({ createdAt: 1 });

    res.status(200).json({
        status: "success",
        results: jobPosts.length,
        data: {
            jobPosts,
        },
    });
});
