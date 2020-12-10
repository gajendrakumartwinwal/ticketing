import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import {currentUserRouter} from './routes/current-user'
import {signRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middleware/error_handler";
import {NotFoundError} from "./error/NotFoundError";
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);


app.use(currentUserRouter);
app.use(signRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log(e);
    }

    app.listen(3000, () => {
        console.log('v23');
        console.log('Auth: on 3000!');
    });
}

start();

