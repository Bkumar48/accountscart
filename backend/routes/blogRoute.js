const express = require("express");
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    liketheBlog,
    disliketheBlog
    
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-blog", authMiddleware, isAdmin, createBlog);
router.put('/like', authMiddleware, liketheBlog);
router.put('/dislike', authMiddleware, disliketheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/:id", getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
