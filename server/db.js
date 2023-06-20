import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongoDB`);

    return db;
  } catch (error) {
    console.error("something went wrong", error);

    process.exit(1);
  }
};

export default connectDb;
