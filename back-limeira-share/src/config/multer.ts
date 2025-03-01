import multer from "multer";
import path from "path";

// Configurar onde os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtros de arquivo permitidos
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function
) => {
  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não permitido"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
