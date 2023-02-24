const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { addCategory, updateCategory, deleteCategory, getCategory, getCategories } = require("../controller/blogCatCtrl");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");


router.post("/add-blog-category", authMiddleware, isAdmin, addCategory);
router.put("/update-blog-category/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/delete-blog-category/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/get-blog-category/:id", authMiddleware, isAdmin, getCategory);
router.get("/getall-blog-category", authMiddleware, isAdmin, getCategories);

module.exports = router;
