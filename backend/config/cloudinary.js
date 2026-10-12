import { v2 as cloudinary } from "cloudinary";
console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? "FOUND" : "NOT FOUND",
});

export default cloudinary;