import express, {Request, Response} from "express";
import {currentUser, NonAuthorisedError, NotFoundError, requreAuth, validateRequest} from "@gajjufoji/common";
import {body, param} from "express-validator";
import {Ticket} from "../models/ticket";

const router = express.Router();
router.put('/api/tickets/:id',
    currentUser,
    requreAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required!'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater then 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const  {title, price} = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        throw new NotFoundError();
    }

    if(ticket.userId !== req.currentUser!.id){
        throw new NonAuthorisedError();
    }
    ticket.set({
        title, price
    });

    await ticket.save();
    res.send(ticket);
});

export {router as UpdateTicketRouter};
