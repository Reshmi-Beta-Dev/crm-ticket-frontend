import { Routes } from '@angular/router';
import { TicketListComponent } from './tickets/ticket-list';
import { TicketDetailComponent } from './tickets/ticket-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
];
