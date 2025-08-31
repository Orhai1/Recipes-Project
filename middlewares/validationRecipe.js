import { body, validationResult } from 'express-validator';

const ALLOWED_DIFFICULTIES = ['easy', 'medium', 'hard'];

function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: 'Validation failed',
      statusCode: 400,
      errors: result.array().map(e => ({ field: e.path, msg: e.msg, value: e.value }))
    });
  }
  next();

}
// recipe validation rules
function buildRecipeValidators({ requireAll }) {
  const reqOrOpt = (field) =>
    requireAll ? body(field).exists({ checkNull: true }) : body(field).optional();

  return [
    reqOrOpt('title')
      .isString().withMessage('title must be a string')
      .trim().isLength({ min: 3, max: 100 }).withMessage('title must be 3-100 characters'),

    reqOrOpt('description')
      .isString().withMessage('description must be a string')
      .trim().isLength({ min: 10, max: 500 }).withMessage('description must be 10-500 characters'),

    reqOrOpt('ingredients')
      .isArray({ min: 1 }).withMessage('ingredients must be a non-empty array'),
    // validation for each ingredient
    body('ingredients.*')
      .if(body('ingredients').exists())
      .isString().withMessage('each ingredient must be a string')
      .trim().notEmpty().withMessage('ingredient cannot be empty'),

    reqOrOpt('instructions')
      .isArray({ min: 1 }).withMessage('instructions must be a non-empty array'),
    body('instructions.*')
      .if(body('instructions').exists())
      .isString().withMessage('each instruction must be a string')
      .trim().notEmpty().withMessage('instruction cannot be empty'),

    reqOrOpt('cookingTime')
      .isFloat({ gt: 0 }).withMessage('cookingTime must be a positive number')
      .toFloat(),

    reqOrOpt('servings')
      .isInt({ gt: 0 }).withMessage('servings must be a positive integer')
      .toInt(),

    reqOrOpt('difficulty')
      .isString().withMessage('difficulty must be a string')
      .customSanitizer(v => String(v).toLowerCase())
      .isIn(ALLOWED_DIFFICULTIES).withMessage(`difficulty must be one of: ${ALLOWED_DIFFICULTIES.join(', ')}`),
  ];
}

// POST all fields are required
export const validateCreateRecipe = [
  ...buildRecipeValidators({ requireAll: true }),
  handleValidationErrors
];

// PUT – partial update: body must not be empty, and all provided fields must be valid
export const validateUpdateRecipe = [
  (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: true, message: 'No data provided for update', statusCode: 400 });
    }
    next();
  },
  ...buildRecipeValidators({ requireAll: false }),
  handleValidationErrors
];
