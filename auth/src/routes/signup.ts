import express from 'express'
import {body, validationResult} from 'express-validator'
import {Request, Response} from "express";
import {RequestValidationError} from "../error/RequestValidationError";
import {DatabaseValidationError} from "../error/DatabaseValidationError";

const router = express.Router()

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password length must be between 4 to 20')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const {email, password} = req.body;
    console.log('Username: ', email, 'Password: ', password);

    throw new DatabaseValidationError();
    res.send('Hi signup!!!!');
});

export {router as signupRouter};