const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Validation middleware
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).optional(),
  body('name').trim().notEmpty().optional()
];

// Routes
router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', authenticate, validateUser, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
