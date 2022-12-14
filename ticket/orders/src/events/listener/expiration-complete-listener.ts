import { Listener,Subjects,ExpirationCompleteEvent,OrderStatus } from "@subhodevroytickets/common";
import { Message } from "node-nats-streaming";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";
import {Order} from '../../models/order'
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;
    queueGroupName='orders-service'
    async onMessage(data:ExpirationCompleteEvent['data'],msg:Message){
        const order=await Order.findById(data.orderId).populate('ticket');
        if(!order){
            throw new Error('Order not found');
        }
        if(order.status===OrderStatus.Complete){
            return msg.ack();
        }
        order.set({
            status:OrderStatus.Cancelled,
        })
        await order.save();
       await new OrderCancelledPublisher(this.client).publish({
            id:order.id,
            version:order.version,
            ticket:{
                id:order.ticket.id
            }
        })
        msg.ack();
    }
}