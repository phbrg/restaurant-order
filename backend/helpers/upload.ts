import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

interface MulterFile {
  originalname: string;
}

const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb: FileFilterCallback) => {
    cb(null, './public/files');
  },
  filename: (req: Request, file: MulterFile, cb: FileFilterCallback) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: MulterFile, cb: FileFilterCallback) => {
  const allowedFileTypes = ['.png', '.jpg', '.jpeg'];

  const fileExt = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file extension.'));
  }
};

export const upload = multer({ storage, fileFilter });
