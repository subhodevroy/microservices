import {Publisher,Subjects,TicketCreatedEvent} from '@subhodevroytickets/common'
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated;
}
