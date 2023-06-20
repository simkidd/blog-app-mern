import User from "../models/userModel";
import bcrypt from "bcrypt";
import uploadPic from "../middlewares/uploadImage";
import fileRemover from "../utils/fileRemover";


// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res
      .status(200)
      .json({ message: "All users retrieved", total: users.length, users });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Error retrieving users" });
  }
};

// get a user
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User retrieved", user });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to get user" });
  }
};

// update a user (admin)
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, profilePic, verified, admin } = req.body;

    // Check if the password field is provided
    let hashedPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashedPassword,
        profilePic,
        verified,
        admin,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// delete user (admin)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndRemove(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

// get user profile
export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Profile retrieved", user });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to get user profile" });
  }
};

// // update user profile
// export const updateUserProfile = async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     const { name, password } = req.body;

//     // Check if the password meets the minimum length requirement
//     if (password && password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: "Password must be at least 6 characters long" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { name, password: hashedPassword },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ message: "Profile updated", user });
//   } catch (error) {
//     next(error);
//     return res.status(500).json({ error: "Failed to update user profile" });
//   }
// };

// // update profile picture
// export const updateProfilePic = async (req, res, next) => {
//   try {
//     const upload = uploadPic.single("profilePicture");

//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({
//           error:
//             "An unknown error occurred when uploading the profile picture: " +
//             err.message,
//         });
//       }

//       if (req.file) {
//         let filename;
//         let updatedUser = await User.findById(req.user._id);
//         filename = updatedUser.profilePic;
//         if (filename) {
//           fileRemover(filename); // Remove previous profile picture
//         }
//         updatedUser.profilePic = req.file.filename;
//         await updatedUser.save();
//         return res
//           .status(200)
//           .json({ message: "Profile picture updated successfully" });
//       } else {
//         let updatedUser = await User.findById(req.user._id);
//         let filename = updatedUser.profilePic;
//         if (filename) {
//           fileRemover(filename); // Remove current profile picture
//         }
//         updatedUser.profilePic = ""; // Set profilePic to empty
//         await updatedUser.save();
//         return res
//           .status(200)
//           .json({ message: "Profile picture removed successfully" });
//       }
//     });
//   } catch (error) {
//     next(error);
//     return res.status(500).json({ error: "Failed to update profile picture" });
//   }
// };

//! update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { name, password } = req.body;

    // Check if the password meets the minimum length requirement
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Hash the password
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Handle profile picture update or removal
    const upload = uploadPic.single("profilePicture");

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error:
            "An unknown error occurred when uploading the profile picture: " +
            err.message,
        });
      }

      if (req.file) {
        let filename = updatedUser.profilePic;
        if (filename) {
          fileRemover(filename); // Remove previous profile picture
        }
        updatedUser.profilePic = req.file.filename;
        await updatedUser.save();
      } else {
        let filename = updatedUser.profilePic;
        if (filename) {
          fileRemover(filename); // Remove current profile picture
        }
        updatedUser.profilePic = ""; // Set profilePic to empty
        await updatedUser.save();
      }

      return res
        .status(200)
        .json({
          message: "Profile updated successfully",
          user: updatedUser,
        });
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to update user profile" });
  }
};

// delete user profile
export const deleteUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findByIdAndRemove(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
