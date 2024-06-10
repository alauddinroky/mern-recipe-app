import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access denied, no token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("successfully verified the user");
    next();
  } catch (e) {
    console.log(e);
    if (e.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token expired" });
    } else if (e.name === "JsonWebTokenError") {
      res.status(401).json({ msg: "Invalid token" });
    } else {
      res.status(500).json({ msg: "Internal server error" });
    }
  }
};

export default auth;
