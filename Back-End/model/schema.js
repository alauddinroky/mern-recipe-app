import mongoose from "mongoose";

// Schema for users of app
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", UserSchema);
export default User;
