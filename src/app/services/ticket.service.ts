import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';

const DEMO_TICKETS: Ticket[] = [
  {
    id: 1,
    title: 'Login not working',
    description: 'User cannot log in with correct credentials.',
    status: 'open',
    assigneeId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'UI bug on dashboard',
    description: 'Dashboard widgets overlap on mobile.',
    status: 'in_progress',
    assigneeId: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Feature request: Dark mode',
    description: 'Add dark mode to settings.',
    status: 'completed',
    assigneeId: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Performance issue',
    description: 'App is slow when loading reports.',
    status: 'open',
    assigneeId: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Email notifications not sent',
    description: 'No emails are sent for new tickets.',
    status: 'open',
    assigneeId: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

@Injectable({ providedIn: 'root' })
export class TicketService {
  getTickets(): Observable<Ticket[]> {
    return of(DEMO_TICKETS).pipe(delay(500));
  }

  getTicket(id: number): Observable<Ticket> {
    const ticket = DEMO_TICKETS.find(t => t.id === id);
    return of(ticket!).pipe(delay(300));
  }

  assignTicket(id: number, assigneeId: number): Observable<Ticket> {
    const ticket = DEMO_TICKETS.find(t => t.id === id);
    if (ticket) {
      ticket.assigneeId = assigneeId;
      ticket.status = 'in_progress';
      ticket.updatedAt = new Date().toISOString();
    }
    return of(ticket!).pipe(delay(300));
  }

  completeTicket(id: number): Observable<Ticket> {
    const ticket = DEMO_TICKETS.find(t => t.id === id);
    if (ticket) {
      ticket.status = 'completed';
      ticket.updatedAt = new Date().toISOString();
    }
    return of(ticket!).pipe(delay(300));
  }
}
