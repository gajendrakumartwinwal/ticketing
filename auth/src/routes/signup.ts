import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {User} from "../models/user";
import jwt from 'jsonwebtoken';
import {BadRequestError, validateRequest} from "@gajjufoji/common";

const router = express.Router()

router.post('/api/users/signup', [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min: 4, max: 20}).withMessage('Password length must be between 4 to 20')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        console.log('GAjendra22' )
        const {email, password} = req.body;
        const userInDB = await User.findOne({email});
        if (userInDB) {
            throw new BadRequestError('Email in use!');
        }
        const user = await User.build({email, password})
        await user.save();
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {jwt: userJWT};

        return res.status(201).send(user);
    });

export {router as signupRouter};
