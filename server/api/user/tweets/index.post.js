import formidable from "formidable";
import { tweetTransformer } from "~~/server/transformers/tweet.js";
import { createTweet } from "../../../db/tweets.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: true });

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      console.log("Parsed files:", files);
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;
  const userId = event.context?.auth?.user?.id;

  // const tweetData = {
  //   text: fields.text,
  //   authorId: userId,
  // };
  const tweetData = {
    text: Array.isArray(fields.text) ? fields.text.join("") : fields.text, // Ensure text is a string
    authorId: userId,
  };
  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null") {
    tweetData.replyToId = replyTo;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const fileArray = files[key];

    // Check if fileArray is an array or a single file object
    if (Array.isArray(fileArray)) {
      // If it's an array, iterate over each file and upload them
      const uploadPromises = fileArray.map(async (file) => {
        if (!file || !file.filepath) {
          throw new Error("File not found");
        }

        const cloudinaryResource = await uploadToCloudinary(file.filepath);
        console.log("Cloudinary response:", cloudinaryResource);
        return createMediaFile({
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          userId: userId,
          tweetId: tweet.id,
        });
      });
      // Await all uploads for this key
      return Promise.all(uploadPromises);
    } else {
      // If it's a single file, process it normally
      const file = fileArray;

      if (!file || !file.filepath) {
        throw new Error("File not found");
      }

      // Upload to Cloudinary
      const cloudinaryResource = await uploadToCloudinary(file.filepath);
      console.log("Cloudinary response:", cloudinaryResource);

      // Save file metadata in the database
      return createMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        userId: userId,
        tweetId: tweet.id,
      });
    }
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
    // files,
  };
});
