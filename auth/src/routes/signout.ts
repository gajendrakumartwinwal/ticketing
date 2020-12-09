import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hi signout!!!!');
});

export {router as signoutRouter};