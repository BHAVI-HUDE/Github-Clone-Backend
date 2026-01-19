// const mongoose = require("mongoose");
// const fileSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: ["file", "folder"],
//       required: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     // Only for files
//     content: {
//       type: String,
//       default: "",
//     },

//     // Only for folders
//     children: {
//       type: [this],   // recursive structure
//       default: [],
//     },

//     lastCommit: {
//       type: String,
//       default: "Initial commit",
//     },

//     updatedAt: {
//       type: String,
//       default: "just now",
//     },
//   },
//   { _id: false }
// );

// module.exports = mongoose.model("File", fileSchema);
