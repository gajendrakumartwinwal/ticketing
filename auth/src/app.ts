import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import {currentUserRouter} from './routes/current-user'
import {signRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError} from "@gajjufoji/common";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false
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

export {app};
