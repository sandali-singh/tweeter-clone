import { getTweets } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let primsaQuery = {
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
        },
      },
      replyTo: {
        include: {
          author: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };
  // Add the `where` clause only if a search term is present
  if (query && query.text) {
    primsaQuery.where = {
      text: {
        contains: String(query.text), // Ensure the search term is a string
        mode: "insensitive", // Optional: make the search case-insensitive
      },
    };
  }

  // if (!!query) {
  //   primsaQuery = {
  //     ...primsaQuery,
  //     where: {
  //       text: {
  //         contains: query,
  //       },
  //     },
  //   };
  // }

  const tweets = await getTweets(primsaQuery);

  return {
    tweets: tweets.map(tweetTransformer),
  };
});
