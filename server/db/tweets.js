import { prisma } from ".";

// export const createTweet = (tweetData) => {
//   return prisma.tweet.create({
//     data: {
//       text: tweetData.text,
//       authorId: tweetData.authorId,
//       replyToId: tweetData.replyToId ? tweetData.replyToId : null,
//     },
//   });
// };

export const createTweet = (tweetData) => {
  // Destructure and set defaults
  const { text, authorId, replyToId = null, mediaFiles = [] } = tweetData;

  return prisma.tweet.create({
    data: {
      text,
      authorId,
      replyToId, // Ensure replyToId is either a string or null
      mediaFiles: mediaFiles.length
        ? {
            connect: mediaFiles.map((id) => ({ id })), // Connect media files if provided
          }
        : undefined, // Only include mediaFiles if it's not empty
    },
  });
};

export const getTweets = (params = {}) => {
  return prisma.tweet.findMany({
    ...params,
  });
};

export const getTweetById = (tweetId, params = {}) => {
  return prisma.tweet.findUnique({
    ...params,
    where: {
      ...params.where,
      id: tweetId,
    },
  });
};
