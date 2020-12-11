import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

const createTicket = (title: string, price: number) => {
    return request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({title, price})
}
it('Can fetch a list of tickets', async () => {

    await createTicket('Concert#1', 20);
    await createTicket('Concert#2', 30);
    await createTicket('Concert#3', 40);


    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).get(`/api/tickets`).send().expect(200);

    expect(response.body.length).toEqual(3);
});
/*

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
*/
