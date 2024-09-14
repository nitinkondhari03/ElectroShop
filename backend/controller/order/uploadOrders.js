const orderModel = require("../../models/orderProductModel");
const addToCartModel = require("../../models/cartProduct");
async function uploadOrders(req, res) {
  try {
    const uploadorder = new orderModel(req.body);
    const saveorder = await uploadorder.save();
    if (saveorder?._id) {
      const deleteCartItem = await addToCartModel.deleteMany({
        userId: req.body.userId,
      });
    }
    res.status(201).json({
      message: "Order upload successfully",
      error: false,
      success: true,
      data: saveorder,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = uploadOrders;
