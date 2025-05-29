// server/seed.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';
import connectDB from './config/db.js';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Connect to DB
await connectDB();

// Load product data from JSON file
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

const importData = async () => {
  try {
    await Product.deleteMany(); // Optional: clear old data
    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products!`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding data: ${error}`);
    process.exit(1);
  }
};

importData();
