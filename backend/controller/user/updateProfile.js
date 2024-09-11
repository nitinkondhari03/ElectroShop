const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function updateProfile(req, res) {
  try {
    console.log("userId", req.userId);
    const user = await userModel.findById(req.userId);

    const doc = await userModel.findOneAndUpdate(
      { _id: user._id },
      { name: req.body.name },
      {
        new: true,
      }
    );

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "Update Profile successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProfile;
