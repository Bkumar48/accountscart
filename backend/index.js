const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const blogCategoryRouter = require("./routes/blogCatRoute");
const blogSubCategoryRouter = require("./routes/blogSubCategoryRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-category",blogCategoryRouter);
app.use("/api/blog-subcategory",blogSubCategoryRouter);


dbConnect();
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
