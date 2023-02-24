const asyncHandler = require("express-async-handler");
const Category = require("../models/blogCatModal");
const { ObjectId } = require('mongodb');
const addCategory = asyncHandler(async (req, res) => {
  try {
    const category_data = await Category.find()
    if (category_data.length > 0) {
      let checking = false;
      for (let i = 0; i < category_data.length; i++) {
        if (
          category_data[i]["category"].toLowerCase() ===
          req.body.category.toLowerCase()
        ) {
          checking = true;
          break;
        }
      }

      console.log(checking);
      if (checking == false) {
        const category = new Category({
          category: req.body.category
        });

        const cat_data = await category.save();
        res
          .status(200)
          .send({ success: true, msg: "Category Data", data: cat_data });
      } else {
        res.status(400).send({
          success: false,
          msg: "(" + req.body.category + ") Category Already Exists"
        });
      }
    } else {
      const category = new Category({
        category: req.body.category
      });

      const cat_data = await category.save();
      res
        .status(200)
        .send({ success: true, msg: "Category Data", data: cat_data });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// update the category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        category: req.body.category
      },
      { new: true }
    );
    if (updatedCategory) {
      res.status(200).send({ data: updatedCategory });
    } else {
      res.status(404).send({ msg: "Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// delete the category
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.status(200).send({ msg: "Category Deleted" });
    } else {
      res.status(404).send({ msg: "Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// get the category
const getCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getBlog_category = await Category.findById(id).populate({path:'subcategories'})
    if (getBlog_category) {
      res.status(200).send({ data: getBlog_category });
    } else {
      res.status(404).send({ msg: "Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// get all categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    const blog_categories = await Category.find().populate({path:'getcat', select:"sub_category"});
    if (blog_categories) {
      res.status(200).send({ data: blog_categories });
    } else {
      res.status(404).send({ msg: "Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addCategory, updateCategory,deleteCategory,getCategory,getCategories };
