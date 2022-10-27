import {Publisher,Subjects,TicketUpdatedEvent} from '@subhodevroytickets/common'
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated=Subjects.TicketUpdated;
}
