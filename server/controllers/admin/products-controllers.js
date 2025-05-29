import { imageUploadUtill } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtill(dataUrl);

    res.json({
      success: true, 
      result,
    });
  } catch (error) {
    console.error("Image upload controller error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred in product controller",
    });
  }
};

export { handleImageUpload }; 
