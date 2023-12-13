const router = require("express").Router();
const authController = require("../controllers/authContoller");
const { verifyAndAuthorize, verifyToken } = require("../middleware/verifyToken");

// REGISTRATION 
router.post("/register", authController.createUser);

//LOGIN
router.post("/login" ,  authController.loginUser);

module.exports = router;