import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const listItemSchema = new Schema({
  name: { type: String },
  colorTheme: { type: String },
  backgroundImage: { type: String },
  items: { type: [String], default: [] },
  users: { type: [String], default: [] },
});

const List = mongoose.models.List || mongoose.model('List', listItemSchema);

export default List;
