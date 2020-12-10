import express, {Request, Response} from 'express'
import {currentUser} from "../middleware/current-user";
import {requreAuth} from "../middleware/requireAuth";

const router = express.Router()

router.get('/api/users/currentuser', currentUser, requreAuth, (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter};
