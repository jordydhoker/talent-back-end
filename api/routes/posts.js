const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PostsController = require('../controllers/posts');

// Handle incoming GET requests to /posts
router.get("/", checkAuth.check_login, PostsController.posts_get_all);

router.post("/", checkAuth.check_login, PostsController.posts_create_post);

router.get("/:postId", checkAuth.check_login, PostsController.posts_get_post);

router.patch("/:postId", checkAuth.check_login, ProductsController.products_update_product);

router.delete("/:postId", checkAuth.check_login, PostsController.posts_delete_post);

module.exports = router;
