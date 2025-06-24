const express = require("express");
const jobPost = require("../controllers/jobController");

const router = express.Router();

router.route("/").get(jobPost.getJobPost).post(jobPost.createJobPost);

module.exports = router;
