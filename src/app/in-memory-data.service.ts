import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Ticket } from './models/ticket.model';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Diana' },
      { id: 5, name: 'Eve' },
      { id: 6, name: 'Frank' },
      { id: 7, name: 'Grace' }
    ];
    const tickets: Ticket[] = [
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
      },
      {
        id: 6,
        title: 'Export to CSV broken',
        description: 'Exported CSV files are empty.',
        status: 'in_progress',
        assigneeId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 7,
        title: 'Search not returning results',
        description: 'Search bar does not return any tickets.',
        status: 'open',
        assigneeId: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 8,
        title: 'Broken link in footer',
        description: 'The "Contact Us" link in the footer is broken.',
        status: 'completed',
        assigneeId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 9,
        title: 'Mobile layout broken',
        description: 'Layout is broken on iPhone SE.',
        status: 'open',
        assigneeId: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 10,
        title: 'Payment gateway error',
        description: 'Payments fail for Visa cards.',
        status: 'in_progress',
        assigneeId: 7,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 11,
        title: 'Data sync fails',
        description: 'Data does not sync between devices.',
        status: 'completed',
        assigneeId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 12,
        title: 'Profile picture upload fails',
        description: 'Users cannot upload profile pictures.',
        status: 'open',
        assigneeId: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    return { tickets, users };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'tickets' && reqInfo.id && reqInfo.url.endsWith('/assign')) {
      return this.assignTicket(reqInfo);
    }
    if (reqInfo.collectionName === 'tickets' && reqInfo.id && reqInfo.url.endsWith('/complete')) {
      return this.completeTicket(reqInfo);
    }
    return undefined;
  }

  private assignTicket(reqInfo: RequestInfo) {
    const ticket = reqInfo.collection.find((t: Ticket) => t.id === +reqInfo.id);
    const { assigneeId } = reqInfo.utils.getJsonBody(reqInfo.req);
    if (ticket) {
      ticket.assigneeId = assigneeId;
      ticket.status = 'in_progress';
      ticket.updatedAt = new Date().toISOString();
      return reqInfo.utils.createResponse$(() => ({
        body: ticket,
        status: STATUS.OK
      }));
    }
    return reqInfo.utils.createResponse$(() => ({ status: STATUS.NOT_FOUND }));
  }

  private completeTicket(reqInfo: RequestInfo) {
    const ticket = reqInfo.collection.find((t: Ticket) => t.id === +reqInfo.id);
    if (ticket) {
      ticket.status = 'completed';
      ticket.updatedAt = new Date().toISOString();
      return reqInfo.utils.createResponse$(() => ({
        body: ticket,
        status: STATUS.OK
      }));
    }
    return reqInfo.utils.createResponse$(() => ({ status: STATUS.NOT_FOUND }));
  }
}
