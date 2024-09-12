// cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqy96w2ak",
  api_key: "796212763994649",
  api_secret: "co7bFHFf_PMv9B42acvSdWdDUks",
});

async function cloudinaryDelete(req, res) {
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    res.status(200).json({
      message: "Delete successfully",
      data: result,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = cloudinaryDelete;
