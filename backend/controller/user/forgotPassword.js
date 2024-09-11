const userModel = require("../../models/userModel");
const sendEmail = require("../../helpers/sendEmail");
const jwt = require("jsonwebtoken");

async function forgotPassword(req, res) {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    throw new Error("User not found");
  }

  const tokenData = {
    _id: user._id,
    email: user.email,
  };

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
    expiresIn: 60 * 60 * 8,
  });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/resetPassword/${token}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      data: token,
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = forgotPassword;
