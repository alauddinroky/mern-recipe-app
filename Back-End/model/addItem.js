import mongoose from "mongoose";

// Schema for users of app
const AddItem = mongoose.Schema({
  title: {
    type: String,
  },
  title2: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    // unique: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Added = mongoose.model("add", AddItem);
export default Added;
