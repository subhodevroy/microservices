import { Publisher, OrderCreatedEvent, Subjects } from '@subhodevroytickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
