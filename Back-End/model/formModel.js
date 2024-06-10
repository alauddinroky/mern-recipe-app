import { Schema, model } from "mongoose";

// Define a Mongoose schema for the form data
const FormDataSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model using the schema
const FormData = model("FormData", FormDataSchema);

export default FormData;
