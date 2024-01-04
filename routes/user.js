const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyAndAuthorize, verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken");

// UPDATE USER 
router.put("/", verifyAndAuthorize, userController.updateUser);

// DELETE USER
router.delete("/", verifyAndAuthorize, userController.deleteUser);

router.get('/', verifyAndAuthorize, userController.getUser );

router.get('/', verifyTokenAndAdmin, userController.getAllUsers);


module.exports = router;