const mongoose = require("mongoose");
const Post = require("../models/post");
const checkAuth = require('../middleware/check-auth');

exports.posts_get_all = (req, res, next) => {

    Post.find()

        .select("-__v")
        .exec()

        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {

                        _id: doc._id,
                        user: doc.user,
                        text: doc.text,

                        request: {
                            type: "GET",
                            url: "http://localhost:3000/posts/" + doc._id
                        }
                    };
                })
            };

            res.status(200).json(response);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.posts_create_post = (req, res, next) => {
    if(req.userData.userId == req.params.userId){
        
    }
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        text: req.body.text,
    });
    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created post successfully",
                createdPost: {
                    _id: result._id,
                    user: result.userId,
                    text: result.text,

                    request: {
                        type: "GET",
                        url: "http://localhost:3000/posts/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.posts_get_post = (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
        .select("-__v")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    post: doc,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/posts"
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.posts_update_post = (req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Post.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Post updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/posts/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.posts_delete_post = (req, res, next) => {
    const id = req.params.postId;
    Post.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Post deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/posts",
                    //body: { name: "String", price: "Number" }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};