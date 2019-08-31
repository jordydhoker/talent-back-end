const mongoose = require("mongoose");
const Post = require("../models/post");


exports.posts_get_all = async (req, res, next) => {
  try {
    res.status(200).json(
      await Post.find()
        .select("-__v")
        .populate("user")
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.posts_get_by_user = async (req, res, next) => {
  try {
    res.status(200).json(
      await Post.find({user: req.params.userId})
        .select("-__v")
        .populate("user")
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.posts_create_post = async (req, res, next) => {
  try {
    const data = await Post.create({
      user: req.userData.userId,
      text: req.body.text
    });
    if (data) {
      res.status(200).json(
        await Post.findById(data._id)
          .select("-__v")
          .populate({
            path: "user",
            select: "-__v -password"
          })
      );
    } else {
      throw new Error("Invalid data given");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.posts_get_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .select("-__v")
      .populate({
        path: "user",
        select: "-__v -password"
      });
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
    const result = await Post.deleteOne({ _id: req.params.postId });
    if (result.deletedCount >= 1) {
      res.status(200).json("Deleted");
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
