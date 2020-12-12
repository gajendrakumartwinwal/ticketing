import { Publisher, Subjects, TicketUpdatedEvent } from '@gajjufoji/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
