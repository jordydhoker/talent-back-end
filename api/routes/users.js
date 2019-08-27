const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.get("/", UserController.users_get_all);

router.get("/:userId", UserController.users_get_user);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth.check_userId, UserController.user_delete);

module.exports = router;
