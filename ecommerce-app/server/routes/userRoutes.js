import express from 'express';
import { registerUser, loginUser } from '../controller/userContoller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// Example protected route
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'You are authorized!',
    user: req.user
  });
});

export default router;
