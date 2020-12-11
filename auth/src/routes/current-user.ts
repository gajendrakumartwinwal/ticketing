import express, {Request, Response} from 'express'
import {requreAuth, currentUser} from '@gajjufoji/common';

const router = express.Router()

router.get('/api/users/currentuser', currentUser, requreAuth, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};
