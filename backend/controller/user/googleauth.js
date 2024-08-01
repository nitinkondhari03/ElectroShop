const bcryptjs = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function googleauth(req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const { password: hashedPassword, ...rest } = user._doc;
      if (checkPassword) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: 60 * 60 * 8,
        });
        const tokenOption = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };
        res.cookie("token", token, tokenOption).status(200).json({
          data: rest,
          success: true,
          error: false,
          message: "Google User Login Successfully!",
        });
        //
      }
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const { password: hashedPassword2, ...rest } = newUser._doc;
      //
      if (checkPassword) {
        const tokenData = {
          _id: newUser._id,
          email: newUser.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: 60 * 60 * 8,
        });

        const tokenOption = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };
        res.cookie("token", token, tokenOption).status(200).json({
          data: rest,
          success: true,
          error: false,
          message: "Google User created Successfully!",
        });
        //
      }
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = googleauth;
