import Article from "../models/articleModel.js";

export async function getAllArticles(req, res) {
  const articles = await Article.find({});
  return res.json(articles);
}

export async function createArticle(req, res) {
  const body = req.body;
  const article = await Article.create(body);
  return res.status(201).json({ msg: "Success" });
}

export async function getArticleByID(req, res) {
  const id = req.params.id;
  const article = await Article.findById(id);
  return res.status(200).json(article);
}

export async function getAllArticlesByLoggedInUser(req, res) {
  const userId = req.params.userId;
  const article = await Article.find({ authorId: userId });
  return res.status(200).json(article);
}
//comments
export async function getComments(req, res) {
  const articleId = req.params.articleId;
  const article = await Article.findById(articleId);
  return res.status(200).json(article.comments);
}

export async function addComments(req, res) {
  const articleId = req.params.articleId;
  const comment = req.body;
  const article = await Article.findByIdAndUpdate(articleId, {
    $addToSet: { comments: comment },
  });
  return res.status(201).json({ msg: "comment added succesfully !!!" });
}

//
