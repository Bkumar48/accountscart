const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getoneUser,
  deleteaUser,
  updateaUser,
  handleRefreshToken,
  logout,
  loginAdmin
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/getUser/:id", authMiddleware, isAdmin, getoneUser);
router.delete("/getUser/:id", deleteaUser);
router.put("/getUser/edit-user", authMiddleware, updateaUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.post("/admin-login", loginAdmin);
module.exports = router;
