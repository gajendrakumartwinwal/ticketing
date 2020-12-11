import mongoose from 'mongoose';
import {app} from "./app";

const start = async () => {
    if (!process.env.JWT_KEY || !process.env.MONGO_URI ) {
        throw new Error('JWT_KEY or MONGO_URI must be defined!');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
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

