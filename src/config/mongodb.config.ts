import mongoose from "mongoose";

// connect to monngo server
const connectDB = async ():Promise<void> => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to MongoDB ${db.connection.host}`);
  } catch (error) {
    console.log(`error connecting to monngo ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;