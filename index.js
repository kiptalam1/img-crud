import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import UserRoutes from "./routes/user.js";
const app = express();

// connect to Db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected successfully!"))
	.catch((err) => console.log("Mongo error", err));

// middleware;
app.use(express.json());

//routes;
app.use("/user", UserRoutes);


// listen to app;
app.listen(5000, () => {
	console.log(`server running...`);
});
