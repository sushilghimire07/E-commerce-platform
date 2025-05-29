import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,        
  api_secret: process.env.CLOUDINARY_API_SECRET,  
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtill(base64File) {
  try {
    const result = await cloudinary.v2.uploader.upload(base64File, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

export { upload, imageUploadUtill };
