const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.users_get_all = async (req, res, next) => {
  try {
    res.status(200).json(await User.find().select("-__v -password"));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.users_get_user = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-__v -password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.users_get_current = async (req, res, next) => {
    try {
      const user = await User.findById(req.userData.userId).select("-__v -password");
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

exports.users_get_user_posts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-__v -password");
      
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.user_signup = async (req, res, next) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(409).json({
        message: "Mail exists"
      });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await User.create(req.body);
    if (data) {
      const token = jwt.sign({ userId: data._id }, "secret");
      res.status(200).json({
        token,
        id: data._id
      });
    } else {
      throw new Error("Invalid data given");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.user_login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User does not exist");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "secret");
      res.status(200).json({
        token,
        id: user._id
      });
    } else {
      throw new Error("Email or password are incorrect");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.user_delete = async (req, res, next) => {
  try {
    const result = await User.deleteOne({ _id: req.params.userId });
    if (result.deletedCount >= 1) {
      res.status(200).json("Deleted");
    } else {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
