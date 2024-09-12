const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function DeleteProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    let product = await productModel.findById(req.body.id);

    if (!product) {
      throw new Error("Product not found with this Id");
    }
    let DeleteProduct = await productModel.findByIdAndDelete(product._id);
    res.status(201).json({
      message: "Product Delete successfully",
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

module.exports = DeleteProductController;
