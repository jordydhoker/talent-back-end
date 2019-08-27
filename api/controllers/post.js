const mongoose = require("mongoose");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

exports.posts_get_all = async (req, res, next) => {
  try {
    res.status(200).json(await Post.find().select("-__v").populate('user'));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.posts_create_post = (req, res, next) => {
  if (req.userData.userId == req.params.userId) {
  }
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.userId,
    text: req.body.text
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

exports.posts_get_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).select("-__v");
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exports.posts_update_post = (req, res, next) => {
//   const id = req.params.postId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Post.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Post updated",
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/posts/" + id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

exports.posts_delete_post = async (req, res, next) => {
  try {
    const result = await Model.deleteOne({ _id: req.params.postId });
    if (result.deletedCount >= 1) {
      res.status(200).json("Deleted");
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
