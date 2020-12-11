import express, {Request, Response} from "express";
import {currentUser, requreAuth, validateRequest} from "@gajjufoji/common";
import {body} from "express-validator";
import {Ticket} from "../models/ticket";

const router = express.Router();
router.get('/api/tickets',
    async (req: Request, res: Response) => {
    const  {title, price} = req.body;
    const tickets = await Ticket.find({});

    res.status(200).send(tickets);
});

export {router as IndexTicketRouter};
