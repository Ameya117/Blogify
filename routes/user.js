const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/signup", userController.getSignup);
router.get("/login", userController.getLogin);
router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);
router.get("/logout", userController.getLogout); 

module.exports = router;
