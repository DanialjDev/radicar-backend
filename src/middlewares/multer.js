const  multer =  require("multer") ;
const { S3Client } = require("@aws-sdk/client-s3");
const  multerS3 =  require("multer-s3") ;

const s3 = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});

exports.upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueName = file.originalname;
      cb(null, uniqueName); 
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(xls|xlsx|pdf|jpg|jpeg|png|gif|doc|docx|ppt|pptx|zip|rar|7z)$/;
    if (allowedExtensions.test(file.originalname.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed!"));
    }
  },
});