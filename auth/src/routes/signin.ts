import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hi signin!!!!');
});

export {router as signRouter};