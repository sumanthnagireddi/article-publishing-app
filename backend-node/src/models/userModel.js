import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: {type:String,unique:true},
  joinedOn: Date,
  photoUrl: String,
  saved: [String],
  following: [String],
  followers: [String],
  articles: [String],
});

const User = mongoose.model("users", userSchema);

export default User;
