const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text
    });
    if (req.files) {
      for (const image of req.files) {
        post.imageUrl = image.location
      }
    }
    try{
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});  
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    } 
};

module.exports.getById = async (req, res) => {
    try {
        await Post.findById(req.params.id).populate('comments').exec((error, post) => {
            res.json(post)
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.update = async (req, res) => {
    const $set = {
        text: req.body.text
    };
    try {
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true});
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id});
        res.json({message: 'Пост удален'});
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.addView = async (req, res) => {
    const $set = {
        views: ++req.body.views
    };
    try {
        await Post.findByIdAndUpdate({_id: req.params.id}, {$set});
        res.status(204).json();
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getAnalyticks = async (req, res) => {
    try {
        const posts = await Post.find();
        const labels = posts.map(post => post.title);
        const json = {
            comments: {
                labels,
                data: posts.map(post => post.comments.length)
            },
            views: {
                labels,
                data: posts.map(post => post.views)
            }
        };
        res.json(json);
    } catch (error) {
        res.status(500).json(error);
    }
};