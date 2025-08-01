import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI : string = process.env.MONGO_URI || " ";
console.log("Mongo_Uri : ", MONGO_URI);

export const mongoDB = async () => {
    mongoose.connect(MONGO_URI).then(() => console.log("MongoDB connected")).catch(() => console.log("MongoDB not connected"));
};

mongoDB();
