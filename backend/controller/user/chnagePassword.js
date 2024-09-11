const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function changePassword(req, res) {
  try {
    const user = await userModel.findById(req.userId);

    const checkPassword = await bcrypt.compare(
      req.body.oldpassword,
      user.password
    );
    if (!checkPassword) {
      throw new Error("Old Password Is Not Match");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(req.body.password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const doc = await userModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashPassword },
      {
        new: true,
      }
    );

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "Change Password successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = changePassword;
