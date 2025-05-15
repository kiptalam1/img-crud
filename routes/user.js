import express from "express";
const router = express.Router();
import cloudinary from "../utils/cloudinary.js";
import { upload } from "../utils/multer.js";
import User from "../models/user.js";

router.post("/", upload.single("image"), async (req, res) => {
	try {
		// upload file to cloudinary;
		const result = await cloudinary.uploader.upload(req.file.path);

		// create instance of user;
		const newUser = await new User({
			name: req.body.name,
			avatar: result.secure_url,
			cloudinaryId: result.public_id,
		});
		// save the new user;
		await newUser.save();
		res.json(newUser);
		res.json(result);
	} catch (error) {
		console.log("Upload error", error);
	}
});

export default router;
