const backendDomin = "https://mern-a77g.onrender.com";
//https://mern-a77g.onrender.com
//http://localhost:8080
const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  googleAuth: {
    url: `${backendDomin}/api/google`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgotPassword`,
    method: "post",
  },
  changePassword: {
    url: `${backendDomin}/api/changePassword`,
    method: "post",
  },
  updateProfile: {
    url: `${backendDomin}/api/updateProfile`,
    method: "post",
  },
  cloudinaryDelete: {
    url: `${backendDomin}/api/cloudinaryDelete`,
    method: "delete",
  },
  resetPassword: {
    url: `${backendDomin}/api`,
    method: "post",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  DeleteProduct: {
    url: `${backendDomin}/api/DeleteProduct`,
    method: "delete",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendDomin}/api/checkout`,
    method: "post",
  },
  payments: {
    url: `${backendDomin}/api/payment`,
    method: "post",
  },
  paymentverify: {
    url: `${backendDomin}/api/payment/verify`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/api/order-list`,
    method: "get",
  },
  allOrder: {
    url: `${backendDomin}/api/all-order`,
    method: "get",
  },
  orderDetails: {
    url: `${backendDomin}/api/order-details`,
    method: "post",
  },
  orderDelete: {
    url: `${backendDomin}/api/order-delete/`,
    method: "delete",
  },
  updateOrderstatus:{
    url: `${backendDomin}/api/update-shipping-status/`,
    method: "PATCH",
  },
  uploadorder: {
    url: `${backendDomin}/api/order`,
    method: "post",
  },
};

export default SummaryApi;
