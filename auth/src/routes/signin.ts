import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {User} from "../models/user";
import jwt from 'jsonwebtoken';
import {Password} from "../services/password";
import {BadRequestError, validateRequest} from "@gajjufoji/common";

const router = express.Router()

router.post('/api/users/signin', [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min: 4, max: 20}).withMessage('Password length must be between 4 to 20')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const userInDB = await User.findOne({email});
        if (!userInDB) {
            throw new BadRequestError('User already exists.');
        }
        const isPasswordMatch = Password.compare(userInDB.password, password);
        if(!isPasswordMatch){
            throw new BadRequestError(`Password doesn't match`);
        }

        const userJWT = jwt.sign({
            id: userInDB.id,
            email: userInDB.email
        }, process.env.JWT_KEY!);

        req.session = {jwt: userJWT};

        return res.status(201).send(userInDB);
    });

export {router as signRouter};
