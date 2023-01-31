const auth = require("./../middleware/auth");
const {Router} = require("express");
const router = Router();
const {loginUserController} = require("../controller/userController");
const {saveUserController} = require("../controller/userController");
const {getUserController} = require("../controller/userController");
const User = require("../model/user");

router.post("/login", loginUserController);
router.post("/register", saveUserController);
router.get("/me", auth, getUserController);

module.exports = router;