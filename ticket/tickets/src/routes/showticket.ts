import express,{Request,Response} from 'express'
import { Ticket } from '../models/ticket'
import { NotFoundError } from '@subhodevroytickets/common';
const router=express.Router();
router.get('/api/tickets/:id',async(req:Request,res:Response)=>{
   
    const ticket=await Ticket.findById(req.params.id);
    if(!ticket){
        throw new NotFoundError();
    }
    res.status(201).send(ticket);
})
export {router as showTicketRouter};