import React, { useState } from "react";
import upload from "../../assets/upload.png";
import "./MyForm.scss"; // Import the CSS file
import NavBar from "../Header/Header";

const MyForm = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const initialData = {
    title: "",
    summary: "",
    price: "",
    image: null, // Add image field to formData
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input is a file input, set the image in formData
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    const missingFields = [];
    if (!formData.title) missingFields.push("Title");
    if (!formData.summary) missingFields.push("Summary");
    if (!formData.price) missingFields.push("Price");
    if (!formData.image) missingFields.push("Image");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill out the following field(s): ${missingFields.join(", ")}`
      );
      return;
    }

    try {
      const formDataToSend = new FormData();
      // Append all form data fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch("http://localhost:5000/submitRecipe", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setRecipeData(data.recipe);
        setErrorMessage("");
        setMessage(data.message);
      } else {
        setRecipeData(null);
        setErrorMessage(data.message);
      }
      setFormData(initialData);
    } catch (error) {
      setRecipeData(null);
      setErrorMessage("Error saving recipe");
    }
  };

  return (
    <>
      <NavBar />
      <div className="form-container">
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Summary"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>
          {/* <div className="form-group">
            <input
              type="file" // Change input type to file for image upload
              name="image"
              accept="image/*" // Specify accepted file types
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="file-input" className="file-input-label">
              <span className="upload-icon">
                <img src={upload} alt="" />
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                id="file-input"
                className="file-input"
              />
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {recipeData && <p>{recipeData.title}</p>}
      {message && <p>{message}</p>}
    </>
  );
};

export default MyForm;
