import express from "express";
import {
  getAllArticles,
  createArticle,
  getArticleByID,
  getAllArticlesByLoggedInUser,
  getComments,addComments
} from "../controllers/articles.js";

const router = express.Router();
router.route("/").get(getAllArticles).post(createArticle);
router.route("/:id").get(getArticleByID);
router.route("/user/:userId").get(getAllArticlesByLoggedInUser);
router.route("/comments/:articleId").get(getComments).put(addComments)
export default router;
