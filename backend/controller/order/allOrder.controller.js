const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findById(userId);
  if (user.role !== "ADMIN") {
    return res.status(500).json({
      message: "not access",
    });
  }
  try {
    const AllOrder = await orderModel.find();

    res.status(200).json({
      data: AllOrder,
      success: true,
      message: "All Orders ",
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = allOrderController;
