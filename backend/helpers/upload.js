const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.png', '.jpg', '.jpeg'];

  const fileExt = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image extension'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;