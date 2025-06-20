


import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({ 
  cloud_name: 'dkntlhf01', 
  api_key: '233286978869793', 
  api_secret: '7CfvcB3RoN5i28DOsn1gg-8M5uA',
});

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: 'test', // will be created if it doesn't exist
    resource_type: 'auto', // ensures all file types work
 // optional: keep original name without extension
  }),
});

export { cloudinary, storage };
