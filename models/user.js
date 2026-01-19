const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {// Hashed Password
        type: String,
        required: true,
        select: false,
    },
    repos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repo"
    }],
    starredRepos: [{
        default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repo"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        type: String // URL
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
