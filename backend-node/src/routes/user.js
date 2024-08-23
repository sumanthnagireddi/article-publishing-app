import express from "express";
import {
  addToSaved,
  createUser,
  followAuthor,
  getAllUsers,
  getFollowers,
  getFollowing,
  getSavedArticles,
  getUserAccountById,
  removeFromSaved,
  unFollowAuthor,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router();
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserAccountById).put(updateUser);
userRouter.route("/followers/:id").get(getFollowers);
userRouter.route("/following/:id").get(getFollowing);
userRouter.route("/saved/:id").get(getSavedArticles);
userRouter.route("/addToSaved/:id").put(addToSaved);
userRouter.route("/removeFromSaved/:id").put(removeFromSaved);
userRouter.route("/follow/:userId/authorId/:authorId").put(followAuthor);
userRouter.route("/unfollow/:userId/authorId/:authorId").put(unFollowAuthor);

export default userRouter;
