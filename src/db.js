import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/merndb');
    console.log(' >>> DB connection established');

  } catch (error) {
    console.log(error);
  }

};