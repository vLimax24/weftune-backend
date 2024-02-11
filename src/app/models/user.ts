import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
     type: String,
  },
  password: { type: String },
  avatarImage: { type: String },
  createdAt: { type: Date, default: Date.now()},
  lists: { type: [String], default: [] },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
