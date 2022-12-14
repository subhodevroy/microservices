import { Message } from "node-nats-streaming";
import { Subjects,Listener,TicketUpdatedEvent } from "@subhodevroytickets/common";
import { Ticket } from "../../models/ticket";
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent >{
    subject: Subjects.TicketUpdated=Subjects.TicketUpdated;
    queueGroupName='orders-service'
    async onMessage(data:TicketUpdatedEvent['data'],msg:Message){
     const ticket=await Ticket.findOne({
        _id:data.id,
        version:data.version-1
    })
    //const ticket=Ticket.findByEvent(data);
     if(!ticket){
        throw new Error('Ticket not found')
     }
     const {title,price}=data;
     ticket.set({title,price});
        msg.ack();
    }
}