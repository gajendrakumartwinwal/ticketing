import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

it('Returns 404 if ticket not found!', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('Returns ticket if the ticket is found!', async () => {
    const title = 'Concert';
    const price = 20;

    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({title, price})

    const ticketresponse = await request(app).get(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send()
        .expect(200);
    expect(ticketresponse.body.title).toEqual(title);
    expect(ticketresponse.body.price).toEqual(price);
});
