const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) =>{
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()){
        const errorMsg = errors.array().map(({ message }) => message);

        const arrayMsg = errorMsg.join('. ');
        

        return next(new AppError(arrayMsg, 400));
    }

    next();
}

const createUserValidators = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('must enter a valid email')
        .isEmail()
        .withMessage('must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({min: 8})
        .withMessage('Password must be at last 8 characters')
        .isAlphanumeric()
        .withMessage('the password must contain letters and numbers'),
    checkResult,
]

const createTaskValidators = [
    body('tittle')
        .notEmpty()
        .withMessage('tittle cannot be empty')
        .isString()
        .withMessage('Tittle must be a string'),
    body('userId')
        .notEmpty()
        .withMessage('User Id cannot be empty')
        .isNumeric()
        .withMessage('User Id must be a number')
        .custom(val => val > 0)
        .withMessage('User id cannot be a negative number'),
    checkResult,
];

module.exports = {createTaskValidators, createUserValidators};

