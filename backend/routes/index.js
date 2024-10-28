const express = require("express");

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhook");
const orderController = require("../controller/order/order.controller");
const allOrderController = require("../controller/order/allOrder.controller");
const googleauth = require("../controller/user/googleauth");
const forgotPassword = require("../controller/user/forgotPassword");
const resetPassword = require("../controller/user/resetPassword");
const changePassword = require("../controller/user/chnagePassword");
const updateProfile = require("../controller/user/updateProfile");
const cloudinaryDelete = require("../controller/user/cloudinaryDelete");
const DeleteProductController = require("../controller/product/deleteProduct");
const payment = require("../controller/payment/payment");
const verify = require("../controller/payment/verify");
const uploadOrders = require("../controller/order/uploadOrders");
const getOdersDetails = require("../controller/order/getOderDetails");
const deleteOrderController=require("../controller/order/deleteOrder");
const updateOrderStatus = require("../controller/order/updateOrderStatus");
const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/google", googleauth);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/changePassword", authToken, changePassword);
router.post("/updateProfile", authToken, updateProfile);
router.delete("/cloudinaryDelete", authToken, cloudinaryDelete);
//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);
router.delete("/DeleteProduct", authToken, DeleteProductController);
//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//payment and order
// router.post("/checkout", authToken, paymentController);
// router.post("/webhook", webhooks); // /api/webhook
router.post("/order-details", authToken, getOdersDetails);
router.delete("/order-delete/:id",authToken,deleteOrderController)
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);
router.post("/payment", authToken, payment);
router.post("/payment/verify", authToken, verify);
router.post("/order", authToken, uploadOrders);
router.patch("/update-shipping-status",authToken,updateOrderStatus)
module.exports = router;
