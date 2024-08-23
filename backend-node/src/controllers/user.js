import Article from "../models/articleModel.js";
import User from "../models/userModel.js";

// basic crud for user

export async function getAllUsers(req, res) {
  const users = await User.find({});
  return res.status(200).json(users);
}

export async function createUser(req, res) {
  const body = req.body;
  try {
    const user = await User.create(body);
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: `Duplicate entry found with email address ${body.email}` });
  }
}

export async function getUserAccountById(req, res) {
  const userId = req.params.id;
  const account = await User.findById(userId);
  return res.status(200).json(account);
}

export async function updateUser(req, res) {
  const userId = req.params.id;
  const body = req.params.body;
  const account = await User.findByIdAndUpdate(userId, body);
  return res.status(200).json({ msg: "Account Updated succesfully!!!" });
}

export async function deleteUser(req, res) {
  const userId = req.params.id;
  const account = await User.findByIdAndDelete(userId);
  return res.status(200).json({ msg: "Account deleted succesfully!!!" });
}

// extra functions
export async function getAllArticlesByUser(req, res) {
  const userId = req.params.userId;
  const article = await Article.find({ authorId: userId, status: "published" });
  return res.status(200).json(article);
}

export async function getFollowers(req, res) {
  console.log(req.params);

  const userId = req.params.id;
  const user = await User.findById(userId);
  return res.status(200).json(user.followers);
}

export async function getFollowing(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  return res.status(200).json(user.following);
}

// saved feature
export async function getSavedArticles(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const data = await getArticlesByIds(user.saved);
  return res.status(200).json(data);
}

export async function addToSaved(req, res) {
  const userId = req.params.id;
  const { id } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { saved: id } }, // Use $addToSet to avoid duplicates
    { new: true, runValidators: true } // Return the updated document and run validation
  );
  return res.status(200).json({ msg: "Added To Saved Succesfully!!" });
}

export async function removeFromSaved(req, res) {
  const userId = req.params.id;
  const { id } = req.body;
  await User.findByIdAndUpdate(
    userId,
    { $pull: { saved: id } },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ msg: "Removed from Saved Succesfully!!" });
}

//follow and unfollow authors

export async function followAuthor(req, res) {
  const userId = req.params.userId;
  const authorId = req.params.authorId;
  const user = await User.findByIdAndUpdate(userId, {
    $addToSet: { following: authorId },
  });
  const author = await User.findByIdAndUpdate(authorId, {
    $addToSet: { followers: userId },
  });
  return res.status(200).json({ msg: "Updated Succesfully" });
}

export async function unFollowAuthor(req, res) {
  const userId = req.params.userId;
  const authorId = req.params.authorId;
  const user = await User.findByIdAndUpdate(userId, {
    $pull: { following: authorId },
  });
  const author = await User.findByIdAndUpdate(authorId, {
    $pull: { followers: userId },
  });
  return res.status(200).json({ msg: "Updated Succesfully" });
}

export async function getArticlesByIds(ids) {
  const articles = await Promise.all(
    ids.map(async (id) => {
      if (!id) return null;
      return await getArticleById(id);
    })
  );
  return articles;
}
export async function getArticleById(id) {
  const article = await Article.findById(id);
  return article;
}
