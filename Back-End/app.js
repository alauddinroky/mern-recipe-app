// To connect with your mongoDB database
import mongoose from "mongoose";
import User from "./model/schema.js";
import FormData from "./model/formModel.js";
import { signUp, deleteUser, Login } from "./controller/user.js";

// For backend and express
import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import fs from "fs";
//files import section
import { addItem } from "./controller/addItem.js";
import multerMiddleWare from "./middleware/multerMiddleWare.js";
import { deleteRecipe, getRecipe, submitRecipe } from "./controller/submit.js";
import auth from "./middleware/auth.js";

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static("./uploads/"));

const CONNECTION_URL = "mongodb://localhost/memories";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((e) => console.log(error.message));

//setting for routes
app.get("/", (req, resp) => {
  resp.send("App is Working");
});
app.get("/getRecipe", auth, getRecipe);
app.get("/users", async (req, res) => {
  try {
    let result = User.find();
    res.status(200).json(await result);
  } catch (e) {
    console.log(e.message);
  }
});

//all the post routes here
app.post("/additem", addItem);
app.post("/register", signUp);
app.post("/submitRecipe", multerMiddleWare, submitRecipe);
app.post("/login", Login);
// app.get("/deleteRecipe", deleteRecipe);

//all delete routes here
app.delete("/delete", deleteUser);
app.delete("/deleteRecipe/:id", async (req, res) => {
  try {
    const listId = req.params.id;

    // Find the deleted object to get the image path
    const selectedFile = await FormData.findById(listId);

    // Unlink the image if the object existed
    if (selectedFile) {
      fs.unlink("./uploads/" + selectedFile.imagePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully deleted file");
        }
      });
    } else {
      console.log("Object not found");
    }
    // Delete the object by ID
    const result = await FormData.findByIdAndDelete(listId);
    res.status(200).json({ message: "successfully deleted item" });
    console.log("List ID:", listId);
  } catch (error) {
    console.error(error);
  }
});

// app.delete("/delete", async (req, res) => {
//   try {
//     await User.deleteMany();
//     res.send("deleted");
//     console.log(User.find());
//   } catch (e) {
//     console.log(e.message);
//   }
// });
