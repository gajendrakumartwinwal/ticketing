import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req: any, res: { send: (arg0: string) => void; }) =>{
    res.send('Hi Youghlklkl!!!!');
});

export {router as currentUserRouter};