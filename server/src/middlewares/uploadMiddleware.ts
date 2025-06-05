import multer from 'multer';

const storage = multer.memoryStorage(); // stocke dans la RAM (utile pour S3)
export const upload = multer({ storage });
