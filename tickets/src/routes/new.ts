import express, {Request, Response} from "express";
import {currentUser, requreAuth, validateRequest} from "@gajjufoji/common";
import {body} from "express-validator";
import {Ticket} from "../models/ticket";
import {TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
import {natsWrapper} from "../nats-wrapper";

const router = express.Router();
router.post('/api/tickets',
    currentUser,
    requreAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required!'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater then 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const  {title, price} = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })
    res.status(201).send(ticket);
});

export {router as CreateTicketRouter};
