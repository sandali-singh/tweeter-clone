import { prisma } from ".";

// export const createTweet = (tweetData) => {
//   return prisma.tweet.create({
//     data: tweetData,
//   });
// };

export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: {
      text: tweetData.text,
      authorId: tweetData.authorId,
      replyToId: tweetData.replyToId ? tweetData.replyToId : null,
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
