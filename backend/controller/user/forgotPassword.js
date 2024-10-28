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
  const username = user.name;
  // const message = `Your password reset token is :- \n\n  ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.'<button>Reset Password button>'`;
  const message = `<div>
      <div>
      <img
        src="https://mern-liard-kappa.vercel.app/static/media/Online%20Shop%20Logo.8a37346d4b136f5f5dcd.png"
        width="50px"
        alt="img"
        style="transition: all;mix-blend-mode: multiply;"
      />
      <p style="margin-top: -15px;">Electro Shop</p>
      
     </div>
      <div style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;width: auto;">
      <p style="font-size:xx-large;color: rgb(82, 80, 80);">Hello ${username}</p>
      <p style="font-weight: bolder; font-size: large; font-family: 'Courier New', Courier, monospace;">
        A request has been received to change the Password for your Electro shop
        account.
      </p>
      <a href="${resetPasswordUrl}"
        ><button
          style="
            background-color: rgb(34, 87, 107);
            color: white;
            font-size: 20px;
            padding: 1%;
            cursor: pointer;
            border-radius: 12px;font-family: 'Courier New', Courier
          "
        >
          Reset Password
        </button></a
      >
      <p style="font-size: large; font-family: 'Courier New', Courier, monospace; font-size: medium;">
        if you did not initiate this request , please contact us immediately at
        nitinkondhari03@gmail.com
      </p>
      <p style="font-size: large; font-family: 'Courier New', Courier, monospace;font-size: medium;">
        Thank you
        <br />
        The Electro Shop Team
      </p>
</div>
    </div>`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Electro Shop Password Recovery`,
      message,
    });

    res.status(200).json({
      data: token,
      success: true,
      message: `A password reset link has been successfully sent to ${user.email}. Please check your email`,
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
