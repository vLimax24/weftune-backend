// db.js
import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connect;
