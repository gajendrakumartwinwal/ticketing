import request from 'supertest';
import {app} from "../../app";

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 on invalid email signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 on invalid password signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'i'
        })
        .expect(400);
});

it('returns a 400 with missing email & password signup', async () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'hhkjhkjh@gmail.com',
        })
        .expect(400);

    request(app)
        .post('/api/users/signup')
        .send({
            password: 'khkjhk'
        })
        .expect(400);
});


it('dissallow two signup with same email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'sasasasas'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'sasasasas'
        })
        .expect(400);
});


it('sets a cookie after succesfull signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'fkajsljflsa'
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});

