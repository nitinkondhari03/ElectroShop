const orderModel = require("../../models/orderProductModel");

async function deleteOrderController(req, res) {
  try {
    let order = await orderModel.findById(req.params.id);
    if (!order) {
      throw new Error("Order not found with this Id");
    }
    let DeleteProduct = await orderModel.findByIdAndDelete(order._id);
    res.status(201).json({
      message: "Order Cancel successfully",
      error: false,
      success: true,
      data: DeleteProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteOrderController;
