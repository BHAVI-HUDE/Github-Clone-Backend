const mongoose = require("mongoose");
const Repository = require("../models/repo.js");
const User = require("../models/user.js");
const Issue = require("../models/issue.js");

async function createIssue(req, res) {
  const { title, description, repository } = req.body;

  try {
    const repo = await Repository.findById(repository);
    if (!repo) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const issue = new Issue({
      title,
      description,
      repository,
    });

    await issue.save();

    // link issue to repo
    repo.issues.push(issue._id);
    await repo.save();

    res.status(201).json({
      success: true,
      issue,
    });
  } catch (error) {
    console.log("Error creating issue: ", error);
    res.status(500).json({ error: "Server Error" });
  }
}


async function updateIssueById(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({
                error: "Issue not found",
            });
        }

        // Update only provided fields
        if (title !== undefined) issue.title = title;
        if (description !== undefined) issue.description = description;
        if (status !== undefined) issue.status = status;

        await issue.save();

        res.json({
            success: true,
            issue,
        });
    } catch (error) {
        console.log("Error Updating Issue: ", error);
        res.status(500).json({
            error: "Server Error",
        });
    }
}


async function deleteIssueById(req, res){
    try{
        const {id} = req.params;
        const issue = await Issue.findByIdAndDelete(id);

        if(!issue){
            return res.status(400).json({
                error: "Issue not found"
            });
        }

        res.json({
            success: true,
            message: "Issue deleted successfully"
        });
    } catch(error) {
        console.log("Error Deleting Issue: ",error);
        res.status(500).json({
            error: "failed to delete issue"
        });
    }
}

async function getAllIssues(req, res) {
  const { repoId } = req.params;

  try {
    const issues = await Issue.find({ repository: repoId });

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    console.log("Error fetching issues: ", error);
    res.status(500).json({
      error: "Failed to fetch issues",
    });
  }
}


async function getIssueById(req, res){
    try{
        const {id} = req.params;
        const issue = await Issue.findById(id);

        if(!issue) {
            return res.status(404).json({
                error: "Issue not found"
            });
        }
        res.json({
            success: true,
            issue
        });
    } catch(error){
        console.log("Error fetching issues: ",error);
        res.status(500).json({
            error: "Failed to fetch issue"
        });
    }
}

const toggleIssueStatus = async (issue) => {
  const newStatus = issue.status === "open" ? "closed" : "open";

  try {
    await apiRequest(`/issue/update/${issue._id}`, {
      method: "POST",
      body: {
        status: newStatus,
      },
    });

    fetchIssues();
  } catch (err) {
    alert("Failed to update issue status");
  }
};


module.exports = {
    createIssue, 
    updateIssueById, 
    deleteIssueById, 
    getAllIssues, 
    getIssueById,
    toggleIssueStatus
};