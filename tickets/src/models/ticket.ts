import mongoose from 'mongoose';

interface TicketAttrs {
    userId: string
    title: string
    price: number
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

interface TicketDoc extends mongoose.Document {
    userId: string
    title: string
    price: number
    id: string
    // updatedAt: string
}

const ticketSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            // delete ret.userId
            delete ret._id
            delete ret.__v
            ret.id = doc._id
        }
    }
});

// ticketSchema.pre('save', async function (done) {
//     if(this.isModified('password')){
//         const hashed = await Password.toHash(this.get('password'));
//         this.set('password', hashed);
//     }
//     done();
// })

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('User', ticketSchema);

export {Ticket};
