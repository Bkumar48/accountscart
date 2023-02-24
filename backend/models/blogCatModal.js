const mongoose = require("mongoose");

const blogCategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogSubCategory",
      }
    ]
  },
 
);


blogCategorySchema.virtual('getcat', {
  ref: 'blogSubCategory', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'category', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
blogCategorySchema.set('toObject', { virtuals: true });
blogCategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("blog-Category", blogCategorySchema);
