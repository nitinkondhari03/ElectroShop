const express = require('express');
const userSignUpController = require("../controller/user/userSignUp");


const router = express.Router()

router.post("/signup",userSignUpController)



module.exports = router