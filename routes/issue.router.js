const express = require("express");
const issueRouter = express.Router();
const issueController = require("../controllers/issueController");

//Create Issue
issueRouter.post("/create", issueController.createIssue);

//Update Issue
issueRouter.post("/update/:id", issueController.updateIssueById);

//Delete Issue
issueRouter.delete("/delete/:id", issueController.deleteIssueById);

//Get All Issues
issueRouter.get("/repo/:repoId", issueController.getAllIssues);

//Get Issue By Id
issueRouter.get("/:id", issueController.getIssueById);

module.exports = issueRouter;