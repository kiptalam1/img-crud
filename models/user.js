import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	cloudinaryId: {
		type: String,
	},
});

export default mongoose.model("User", UserSchema);
