import express from 'express'
import {body, validationResult} from 'express-validator'
import {Request, Response} from "express";
import {RequestValidationError} from "../error/RequestValidationError";
import {DatabaseValidationError} from "../error/DatabaseValidationError";
import {User} from "../models/user";
import {BadRequestError} from "../error/BadRequestError";

const router = express.Router()

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password length must be between 4 to 20')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const {email, password} = req.body;
    const userObj = await User.findOne({email});
    if(userObj){
        throw new BadRequestError('Email in use!');
    }
    const savedUser = await User.build({email, password}).save();
    return res.status(201).send(savedUser);
});

export {router as signupRouter};
