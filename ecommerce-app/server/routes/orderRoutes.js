import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  markOrderAsPaid,
  markOrderAsDelivered
} from '../controller/orderController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);               // Place order
router.get('/myorders', protect, getMyOrders);        // User's own orders
router.get('/', protect, admin, getAllOrders);        // ✅ Admin: All orders
router.get('/:id', protect, getOrderById);            // Order by ID
router.put('/:id/pay', protect, markOrderAsPaid);             // Simulate payment
router.put('/:id/deliver', protect, admin, markOrderAsDelivered); // Admin delivery update

export default router;
