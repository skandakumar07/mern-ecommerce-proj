import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'itemcollections'  // ⬅️ force it to use that collection
});

const Product = mongoose.model('Product', productSchema);

export default Product;
