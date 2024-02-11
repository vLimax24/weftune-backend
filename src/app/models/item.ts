import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: { type: String },
  category: { type: String },
  extendedCategory: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  characteristics: {
    glutenFree: { type: Boolean },
    vegan: { type: Boolean },
    organic: { type: Boolean },
    spicy: { type: Boolean },
    halal: { type: Boolean },
    kosher: { type: Boolean },
    vegetarian: { type: Boolean },
    allergens: { type: [String] },
  },
  nutrition: {
    calories: { type: Number },
    protein: { type: Number },
    carbohydrates: { type: Number },
    fat: { type: Number },
    fiber: { type: Number },
    minerals: {
        iron: { type: Number },
        calcium: { type: Number },
        magnesium: { type: Number },
        phosphorus: { type: Number },
        potassium: { type: Number },
        sodium: { type: Number },
        zinc: { type: Number },
    },
    vitamins: {
        A: { type: Number },
        B: { type: Number },
        C: { type: Number },
        D: { type: Number },
        E: { type: Number },
        K: { type: Number },
        B1: { type: Number },
        B2: { type: Number },
        B3: { type: Number },
        B5: { type: Number },
        B6: { type: Number },
        B7: { type: Number },
        B9: { type: Number },
        B12: { type: Number },
    }
  },
  storage: {
    temperature: { type: String },
    humidity: { type: String },
    shelfLife: { type: String },
  },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
