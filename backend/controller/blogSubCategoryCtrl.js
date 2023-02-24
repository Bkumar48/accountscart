const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/blogSubCatModal");
const Category = require("../models/blogCatModal");
const create_subcategory = asyncHandler(async (req, res) => {
  try {
    const check_sub = await SubCategory.find({
      category_id: req.body.category_id
    });
    if (check_sub.length > 0) {
      let checking = false;
      for (let i = 0; i < check_sub.length; i++) {
        if (
          check_sub[i]["sub_category"].toLowerCase() ===
          req.body.sub_category.toLowerCase()
        ) {
          checking = true;
          break;
        }
      }
      if (checking === false) {
        const subCategory = new SubCategory({
          category_id: req.body.category_id,
          sub_category: req.body.sub_category
        });
        const sub_cat_data = await subCategory.save();
        res.json(sub_cat_data);
      } else {
        res
          .status(400)
          .send({
            msg: "(" + req.body.sub_category + ")Sub Category Already Exists"
          });
        // throw new Error("Sub Category Already Exists");
      }
    } else {
      const subCategory = new SubCategory({
        category_id: req.body.category_id,
        sub_category: req.body.sub_category,
      });

      const sub_cat_data = await subCategory.save();
      res.json(sub_cat_data);

      const id = await Category.findByIdAndUpdate({_id : subCategory.category_id});
      id.subcategories.push(subCategory);
      await id.save();
      
      
    }
  } catch (error) {
    throw new Error(error);
  }
});

// update sub_category
const updateSubCategory = asyncHandler(async (req, res) => {
  try {
    const updatedSubCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        category: req.body.category
      },
      { new: true }
    );
    if (updatedSubCategory) {
      res.status(200).send({ data: updatedSubCategory });
    } else {
      res.status(404).send({ msg: "Sub Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// delete sub_category from category
const deleteSubCategory = asyncHandler(async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      req.params.id
    );
    if (deletedSubCategory) {
      res.status(200).send({ data: deletedSubCategory , message: "Sub Category Deleted" });
    } else {
      res.status(404).send({ msg: "Sub Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// get sub category
const getSubCategory = asyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (subCategory) {
      res.status(200).send({ data: subCategory });
    } else {
      res.status(404).send({ msg: "Sub Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// get all sub category
const getAllSubCategory = asyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({});
    if (subCategories) {
      res.status(200).send({ data: subCategories });
    } else {
      res.status(404).send({ msg: "Sub Category Not Found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  create_subcategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
  getAllSubCategory
};
