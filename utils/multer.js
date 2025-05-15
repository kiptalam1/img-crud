import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

// filter files;
const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname);
	if (ext !== ".jpg" && ext !== ".jpeg" && ".png") {
		cb(new Error("File type is not supported"), false);
		return;
	}
	cb(null, true);
};

//multer config;
export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
});
