const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbid = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
// create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already registered");
  }
});

// login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findOneAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken
      },
      {
        new: true
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    });

    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//admin Login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if(findAdmin.role !== 'admin'){
    throw new Error('Not Authorized')
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findOneAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken
      },
      {
        new: true
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    });

    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id)
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("No refresh Token present in DB");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is Somethimg Wrong with RefreshToken");
    } else {
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    }
  });
});

// Logout a user
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: ""
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true
  });
  return res.sendStatus(204);
});

//Update a user
const updateaUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbid(_id);
  try {
    const updateaUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body.firstname,
        lastname: req?.body.lastname,
        email: req?.body.email,
        mobile: req?.body.mobile
      },
      {
        new: true
      }
    );
    res.json(updateaUser);
  } catch (err) {
    throw new Error(err);
  }
});

// get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
});

// get One user
const getoneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbid(id);
  try {
    const getoneUser = await User.findById(id);
    res.json(getoneUser);
  } catch (err) {
    throw new Error(err);
  }
});

// Delete a user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getoneUser,
  deleteaUser,
  updateaUser,
  handleRefreshToken,
  logout,
  loginAdmin
};
