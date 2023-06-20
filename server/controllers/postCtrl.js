import Post from "../models/postModel";
import Comment from "../models/commentModel";
import { v4 as uuidv4 } from "uuid";
import uploadPic from "../middlewares/uploadImage";
import fileRemover from "../utils/fileRemover";

// create a new post
export const createPost = async (req, res, next) => {
  try {
    const upload = uploadPic.single("photo");

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "An unknown error occurred when uploading: " + err.message,
        });
      }

      const { title, caption, body } = req.body;

      let photo = "";
      if (req.file) {
        photo = req.file.filename;
      }

      const post = new Post({
        title,
        caption,
        slug: uuidv4(),
        body,
        photo,
        user: req.user._id,
      });

      const createdPost = await post.save();
      return res.status(201).json(createdPost);
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

// get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["profilePic", "name", "verified"],
      },
    ]);

    return res.status(200).json({ total: posts.length, posts });
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

// get a post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["profilePic", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["profilePic", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["profilePic", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      return res.status(404).json({ error: "Post was not Found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Failed to retrieve post" });
  }
};

// update a post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ error: "post was not found" });
    }

    const upload = uploadPic.single("postPicture");

    const handleUpdatePostData = async () => {
      const { title, caption, slug, body, tags, categories } = req.body;

      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      const updatePost = await post.save();
      return res.status(200).json(updatePost);
    };

    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: "An unknown error occurred when uploading: " + err.message,
        });
      } else {
        // everything went well
        if (req.file) {
          const filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
        } else {
          const filename = post.photo;
          if (filename) {
            post.photo = "";
            fileRemover(filename);
          }
        }
        handleUpdatePostData();
      }
    });
  } catch (error) {
    next(error);
  }
};

// delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ error: "post was not found" });
    }

    // Delete the associated photo file
    if (post.photo) {
      const filename = post.photo;
      fileRemover(filename);
    }

    await Comment.deleteMany({ post: post._id });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
