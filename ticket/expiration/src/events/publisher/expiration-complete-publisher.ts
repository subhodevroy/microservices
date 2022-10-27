import {Subjects,Publisher,ExpirationCompleteEvent} from '@subhodevroytickets/common'
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete;
    
}