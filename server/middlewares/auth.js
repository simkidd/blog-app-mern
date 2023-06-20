import { verify } from "jsonwebtoken";
import User from "../models/userModel";

export const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(id).select("-password");
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      next(error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};

export const admin = async (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    return res.status(401).json({ error: "Not authorized as an admin" });
  }
};
