const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");
require("dotenv").config();

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generatOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");
  return orderId.substr(0, 12);
}

const payment = async (req, res) => {
  console.log(req.body)
  try {
    let request = {
      order_amount: req.body.totalPrice,
      order_currency: "INR",
      order_id: await generatOrderId(),
      customer_details: {
        customer_id: req.body.id,
        customer_phone:req.body.phoneNo,
        customer_name:req.body.name,
        customer_email:req.body.email,
      },
    };
    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log("response.data", response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log("error.response.data.message", error.response.data.message);
        res.json("error.response.data.message", error.response.data.message);
      });
  } catch (error) {
    res.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = payment;
