import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateTask = [
    body('taskName')
        .notEmpty().withMessage('Task name is required')
        .isLength({ min: 3 }).withMessage('Task name must be at least 3 characters long'),
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
    body('isCompleted')
        .optional().isBoolean().withMessage('isCompleted must be a boolean'),
];

export const validateUpdateTask = [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('taskName').optional().isString().withMessage('Task name must be a string'),
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('isCompleted').optional().isBoolean().withMessage('isCompleted must be a boolean'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
    }
    next();
};