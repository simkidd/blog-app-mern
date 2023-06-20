import User from "../models/userModel";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT";


export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    // Validate email domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const domain = email.split("@")[1];
    const validDomains = ["example.com", "domain.com"]; // Add your valid email domains here

    if (!validDomains.includes(domain)) {
      return res.status(400).json({ error: "Invalid email domain." });
    }

    // Check whether the user exists or not
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = generateJWT(newUser);

    return res.status(201).json({message: "Registered successfully", token, newUser});
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate JWT token
    const token = generateJWT(user);

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Error logging in" });
  }
};
