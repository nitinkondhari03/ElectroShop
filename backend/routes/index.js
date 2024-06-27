const express = require('express');
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require('../controller/user/userSignIn');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/userDetails');


const router = express.Router()

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)


module.exports = router