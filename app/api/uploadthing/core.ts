import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  doctorProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),
  advertImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),
  agentImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),

  propertyImages: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),
  propertyImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),

  blogImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "MARKETHUB" };
    }
  ),
  multiplePropertyImages: f({
    image: { maxFileSize: "8MB", maxFileCount: 8 },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "ZimProperties" };
    }),
  patientMedicalFiles: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "MARKETHUB" };
  }),
  additionalDocs: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "MARKETHUB" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
