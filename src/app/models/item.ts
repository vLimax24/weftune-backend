import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
