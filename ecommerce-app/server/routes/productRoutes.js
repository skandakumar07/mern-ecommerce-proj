import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';

const router = express.Router();

router.get('/', getProducts);             // GET all products
router.get('/:id', getProductById);       // GET single product
router.post('/', createProduct);          // POST a new product
// ✅ Admin-only protected routes
router.post('/', protect, admin, createProduct);       // Create product
router.put('/:id', protect, admin, updateProduct);     // Update product
router.delete('/:id', protect, admin, deleteProduct);  // Delete product

export default router;
