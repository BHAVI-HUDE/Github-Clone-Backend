const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
    repository: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository",
        required: true,
    }
});

module.exports = mongoose.model("Issue",issueSchema);