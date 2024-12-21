const PostModel = require("../models/posts.model");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const postsController = {
  async createPost(req, res) {
    try {
      const { cover } = req.files;
      const { title, content, summary } = req.body;
      if (!title || !content || !summary) {
        return res
          .status(400)
          .json({ message: "Title, content and summary are required" });
      }

      let coverUrl = "";
      let coverCloudinaryId = "";
      if (cover) {
        const { tempFilePath } = cover;
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          tempFilePath,
          { folder: "mern_blog" }
        );
        coverUrl = secure_url;
        coverCloudinaryId = public_id;
        fs.unlinkSync(tempFilePath);
      }

      const post = await PostModel.create({
        title,
        content,
        summary,
        cover: coverUrl,
        coverCloudinaryId,
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getPosts(req, res) {
    try {
      const posts = await PostModel.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  async getPost(req, res) {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updatePost(req, res) {
    try {
      const files = req.files;
      let cover;
      if (files) {
        cover = files.cover;
      }
      const { title, content, summary } = req.body;
      if (!title || !content || !summary) {
        return res
          .status(400)
          .json({ message: "Title, content and summary are required" });
      }

      const postToUpdate = await PostModel.findById(req.params.id);
      if (!postToUpdate) {
        return res.status(404).json({ message: "Post not found" });
      }

      const imageToDelete = postToUpdate.coverCloudinaryId;

      let coverUrl = "";
      let coverCloudinaryId = "";
      if (cover) {
        const { tempFilePath } = cover;
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          tempFilePath,
          { folder: "mern_blog" }
        );
        coverUrl = secure_url;
        coverCloudinaryId = public_id;
        fs.unlinkSync(tempFilePath);
      }

      const isCoverUpdated = coverUrl && coverCloudinaryId ? true : false;

      const post = await PostModel.findByIdAndUpdate(
        postToUpdate._id,
        {
          title,
          content,
          summary,
          cover: isCoverUpdated ? coverUrl : imageToDelete.cover,
          coverCloudinaryId: isCoverUpdated
            ? coverCloudinaryId
            : imageToDelete.coverCloudinaryId,
        },
        { new: true }
      );

      if (coverUrl) {
        cloudinary.uploader.destroy(imageToDelete);
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deletePost(req, res) {
    try {
      const postToDelete = await PostModel.findById(req.params.id);
      if (!postToDelete) {
        return res.status(404).json({ message: "Post not found" });
      }

      await PostModel.findByIdAndDelete(req.params.id);

      cloudinary.uploader.destroy(postToDelete.coverCloudinaryId);

      res.status(200).send("Deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = postsController;
