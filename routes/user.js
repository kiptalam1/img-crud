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

// get all users;
router.get("/", async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});

// delete file from cloudinary;
router.delete("/:id", async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		if (!foundUser)
			return res.status(400).json({
				success: false,
				msg: "User not found",
			});
		await cloudinary.uploader.destroy(foundUser.cloudinaryId);
		res.json({
			msg: "File deleted successfully",
			data: foundUser,
		});
	} catch (error) {
		console.log("Cloudinary delete error", error);
	}
});

export default router;
