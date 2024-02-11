import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }]
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;