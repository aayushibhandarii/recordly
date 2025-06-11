import {currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: {
      maxFileSize: `16MB`,
    },
    video: {
      maxFileSize: "512MB",
    },
  })
    .middleware(async ({ }) => {
      // This code runs on your server before upload
      const user = await currentUser();

      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      console.log("Upload complete for userId:", metadata.userId);
        const fileType = file.type.startsWith("image") ? "image" : "video";
      return { 
        userId: metadata.userId,
        fileUrl : file.ufsUrl,
        fileName : file.name,
        fileType : fileType,
        key  :file.key
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
