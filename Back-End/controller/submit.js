import FormData from "../model/formModel.js";
import fs from "fs";
import path from "path";
export const submitRecipe = async (req, resp) => {
  try {
    // Generate a unique ID
    const uniqueId = generateUniqueId();
    // Check if a recipe with the given title already exists
    const existingRecipe = await FormData.findOne({ title: req.body.title });

    if (existingRecipe) {
      const selectedFile = req.files[0].filename;
      // If the recipe already exists, respond with a message
      fs.unlink("./uploads/" + selectedFile, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully deleted file");
        }
      });
      return resp.status(200).json({ message: "Recipe already exists" });
    } else {
      console.log(req.files[0]);
      // If the recipe doesn't exist, save the new recipe with the unique ID
      const newRecipeData = {
        ...req.body,
        uniqueId,
        imagePath: req.files[0].filename,
      };

      const newRecipe = new FormData(newRecipeData);
      await newRecipe.save();
      return resp
        .status(200)
        .json({ message: "Recipe saved successfully", recipe: newRecipe });
    }
  } catch (error) {
    // If any error occurs, respond with an error message
    return resp.status(500).json({ message: error.message });
  }
  function generateUniqueId() {
    // Generate a random 12-character alphanumeric string
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueId = "";
    for (let i = 0; i < 12; i++) {
      uniqueId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return uniqueId;
  }
};

export const deleteRecipe = async (req, res) => {
  const folder = "./uploads";
  try {
    // Delete all documents in the Recipe collection
    await FormData.deleteMany({});
    fs.readdir(folder, (err, files) => {
      files.forEach((file) => {
        const filePath = path.join(folder, file);
        fs.unlink(filePath, (err) => {
          if (err) console.error(err);
          else {
            console.log("successfully deleted all images");
          }
        });
      });
    });
    res.send("All recipes deleted successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getRecipe = async (req, res) => {
  try {
    console.log(req.user);
    const findRecipe = await FormData.find();
    res.status(200).json({ status: 200, data: findRecipe });
  } catch (error) {}
};
