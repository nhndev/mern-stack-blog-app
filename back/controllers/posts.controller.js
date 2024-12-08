const PostModel = require('../models/posts.model');

const postsController = {
    async createPost(req, res) {
        try {
            const post = await PostModel.create(req.body);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getPosts(req, res) {
        try {
            const posts = await PostModel.find();
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
            const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deletePost(req, res) {
        try {
            await PostModel.findByIdAndDelete(req.params.id);
            res.status(200).send('Deleted');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = postsController;