import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const listItemSchema = new Schema({
  itemName: { type: String },
  customProperties: { type: [String] } // Assuming customProperties are strings
});


const listSchema = new Schema({
  name: { type: String },
  colorTheme: { type: String },
  backgroundImage: { type: String },
  items: { type: [listItemSchema], default: [] },
  users: { type: [String], default: [] },
});

const List = mongoose.models.List || mongoose.model('List', listSchema);

export default List;
