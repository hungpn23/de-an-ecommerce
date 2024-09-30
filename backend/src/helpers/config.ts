import { diskStorage } from 'multer';

export const storageConfig = (folderName: string) => {
  return diskStorage({
    destination: `./uploads/${folderName}`,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};
