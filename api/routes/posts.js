const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PostController = require('../controllers/post');

router.get("/", PostController.posts_get_all);

router.post("/", checkAuth.check_login, PostController.posts_create_post);

router.get("/:postId", PostController.posts_get_post);

router.get("/user/:userId", PostController.posts_get_by_user);

// router.patch("/:postId", checkAuth.check_login, PostController.products_update_product);

router.delete("/:postId", checkAuth.check_login, PostController.posts_delete_post);

module.exports = router;
