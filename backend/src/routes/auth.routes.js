const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshAccessToken,
  getProfile,
  updateProfile
} = require('../controllers/auth.controller');

const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full name cannot exceed 100 characters')
];

const loginValidation = [
  body('emailOrUsername')
    .trim()
    .notEmpty()
    .withMessage('Email or username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateProfileValidation = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Full name cannot exceed 100 characters')
];

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', refreshAccessToken);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, validate, updateProfile);

module.exports = router;
