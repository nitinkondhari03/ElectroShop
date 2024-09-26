const orderModel = require("../../models/orderProductModel");

const getOdersDetails = async (req, res) => {
  try {
    const { orderId } = req.body;

    const product = await orderModel.findById(orderId);

    res.json({
      data: product,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getOdersDetails;
