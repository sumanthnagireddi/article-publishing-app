import express from "express";
import { connectMongoDB } from "./src/connection/connection.js";
import router from "./src/routes/articles.js";
import userRouter from "./src/routes/user.js";
const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://sumanthnagireddi:2516@blogstore.m5tv4ca.mongodb.net/?retryWrites=true&w=majority&appName=blogstore"
//mongo connection
connectMongoDB(uri)
  .then(console.log("connection success"))
  .catch("error occured");

//middleware
app.use(express.json());
//routes
app.use("/api/articles", router);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
