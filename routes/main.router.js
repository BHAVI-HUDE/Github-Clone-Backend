const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the VCS!");
});

// User routes
router.use("/user", userRouter);

// Repo routes
router.use("/repo", repoRouter);

// Issue routes
router.use("/issue", issueRouter);

module.exports = {router};
