const userModel = require("../../models/userModel");
const orderModel = require("../../models/orderProductModel");
async function updateOrderStatus(req, res) {
  try {
    const sessionUser = req.userId;

    const { orderId, shipping_status } = req.body;

    const updateOrder = await orderModel.findByIdAndUpdate(
      { _id: orderId },
      { shipping_status: shipping_status },
      {
        new: true,
      }
    );

    res.json({
      data: updateOrder,
      message: "Shipping Status Updated Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateOrderStatus;
