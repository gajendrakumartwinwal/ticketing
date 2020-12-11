import request from 'supertest';
import {app} from "../../app";
import mongoose from "mongoose";

it(`Return a 404 if provided id doesn't exits`, async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'fklas',
            price: 23
        });
    expect(response.status).toEqual(404);
});


it('Returns 401 if user is not signed in', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'fklas',
            price: 23
        });
    expect(response.status).toEqual(401);
});

it('Returns 401 if user doesnot own the ticket', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'lajfkdsa',
            price: 23
        });

    const updateTicketResponse = await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin('2382323'))
        .send({
            title: 'kjjlfda',
            price: 1000
        }).expect(401);
});

it('Returns 400 if user provided invalid title or price', async () => {
    const cookie = global.signin();
    const response = await request(app).post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'lajfkdsa',
            price: 23
        });

    const updateTicketResponse = await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 1000
        }).expect(400);

});


it('Update the ticket provided the valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app).post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'lajfkdsa',
            price: 23
        });

    const updateTicketResponse = await request(app).put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'FOHJI updated',
            price: 100
        }).expect(200);

    const getNewTicket = await request(app).get(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(getNewTicket.body.title).toEqual('FOHJI updated');
    expect(getNewTicket.body.price).toEqual(100);
});


