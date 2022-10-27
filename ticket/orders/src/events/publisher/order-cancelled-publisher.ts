import { Subjects, Publisher, OrderCancelledEvent } from '@subhodevroytickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
