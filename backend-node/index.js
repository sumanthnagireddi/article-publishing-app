import express from "express";
import { connectMongoDB } from "./src/connection/connection.js";
import router from "./src/routes/articles.js";
import userRouter from "./src/routes/user.js";
const app = express();
const PORT = 3000;

//mongo connection
connectMongoDB("mongodb://127.0.0.1:27017/online-publishing-app")
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
