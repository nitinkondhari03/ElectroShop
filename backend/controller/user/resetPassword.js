const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
async function resetPassword(req, res) {
  let token = req.params.token;
  try {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY,
      async function (err, decoded) {
        console.log(err);

        if (err) {
          throw new Error("Please provide correct token");
        }

        let id = decoded?._id;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);

        if (!hashPassword) {
          throw new Error("Something is wrong");
        }
        const doc = await userModel.findOneAndUpdate(
          { _id: id },
          { password: hashPassword },
          {
            new: true,
          }
        );

        res.status(201).json({
          data: doc,
          success: true,
          error: false,
          message: "Password Reset Successfully!",
        });
      }
    );
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = resetPassword;
