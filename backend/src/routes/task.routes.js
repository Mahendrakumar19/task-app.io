const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/task.controller');

const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

router.use(authMiddleware);

const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
];

const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
];

const queryValidation = [
  query('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'title', 'dueDate', 'priority'])
    .withMessage('Invalid sort field'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc')
];

router.get('/stats', getTaskStats);
router.get('/', queryValidation, validate, getTasks);
router.get('/:id', getTask);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
