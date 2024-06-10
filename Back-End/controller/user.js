import User from "../model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ***************************Register Function ************************
export const signUp = async (req, resp) => {
  console.log(req.body.password);
  const { email, password, name } = req.body;
  try {
    const postMessages = await User.find({ email: req.body.email });
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, 444);
    if (postMessages.length > 0) {
      resp.status(200).json({ message: "User already found" });
    } else {
      const user = new User({ email, password: hashedPassword, name });
      let result = await user.save();
      resp.status(200).json({ message: "Data saved" });
    }
  } catch (e) {
    console.log(e.message);
    resp.status(404).json({ message: e.message });
  }
};

// ***************************Login Function ************************
export const Login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  console.log(user, 11221);
  if (!user) {
    console.log("error happening");
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(token, 2211);
  res.json({ token });
};

// ***************************Delete User Function ************************
export const deleteUser = async (req, res) => {
  try {
    await User.deleteMany();
    res.send("deleted");
    // console.log(User.find());
  } catch (e) {
    console.log(e.message);
  }
};
