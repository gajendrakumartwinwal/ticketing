import express from 'express';
import {json} from 'body-parser';
import {currentUserRouter} from './routes/current-user'
import {signRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middleware/error_handler";
import {NotFoundError} from "./error/NotFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

app.listen(3000, () => {
    console.log('v23');
    console.log('Auth: on 3000!');
})
