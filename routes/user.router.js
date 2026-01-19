const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/upload");

//Get all users
userRouter.get("/allUsers",userController.getAllUsers);

//SignUp
userRouter.post("/signup", userController.signUp);

//login
userRouter.post("/login", userController.logIn);

//User profile by ID
userRouter.get("/:id/profile", userController.getUserProfile);

//Update Profile
userRouter.put("/updateProfile/:id", userController.updateUserProfile);

//Delete profile
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);

userRouter.post(
  "/:id/avatar",
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = userRouter;