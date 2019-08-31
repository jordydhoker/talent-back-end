const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.get("/", UserController.users_get_all);

router.get("/current", UserController.users_get_current);

router.get("/:userId", UserController.users_get_user);

router.get("/:userId/posts", UserController.users_get_user_posts);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/", UserController.user_delete);

module.exports = router;
