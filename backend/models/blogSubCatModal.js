const mongoose = require("mongoose");
const blogSubCategorySchema = mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "blog-Category" 
    },
    sub_category: {
      type: String
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: true
  }
);


module.exports = mongoose.model("blogSubCategory", blogSubCategorySchema);
