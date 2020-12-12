import request from 'supertest';
import {app} from "../../app";
import {Ticket} from "../../models/ticket";
import {natsWrapper} from "../../nats-wrapper";

it('has a route handle listing to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
});

it('Can only be accessed if user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('Returns a status other then 401 if user is signed in', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})
    expect(response.status).not.toEqual(401);
});

it('Returns error if title is not provided', async () => {
    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        }).expect(400);
    await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'This is ticket!',
        }).expect(400);
});


it('Returns error if invalid price provided', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'This is Ticket',
            price: -10
        }).expect(400);
});


it('Create a ticket with valid input', async () => {

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'This is Ticket',
            price: 20
        }).expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual('This is Ticket');
    expect(tickets[0].price).toEqual( 20);

});


it('publishes an event', async () => {
    const title = 'asldkfj';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
