import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
  const config = useRuntimeConfig();

  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return _cloudinary;
};

export const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    console.log(image);
    cloudinary().uploader.upload(image, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadToCloudinary = async (filePath) => {
//   return new Promise((resolve, reject) => {
//     // console.log(image);

//     cloudinary.v2.uploader.upload(filePath, (error, data) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve(data);
//     });
//   });
// };
