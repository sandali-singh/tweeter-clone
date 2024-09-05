// import { prisma } from ".";

// export const createMediaFile = (mediaFile) => {
//   return prisma.mediaFile.create({
//     data: mediaFile,
//   });
// };
export const mediaFileTransformer = (mediaFile) => {
  return {
    id: mediaFile.id,
    url: mediaFile.url,
  };
};
