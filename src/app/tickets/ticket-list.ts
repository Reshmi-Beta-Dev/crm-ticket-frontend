import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  users: User[] = [];
  statusFilter: string = '';
  assigneeFilter: number | '' = '';
  loading = true;

  displayedColumns = ['id', 'title', 'status', 'assignee', 'actions'];

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.ticketService.getTickets().subscribe({
      next: tickets => {
        this.tickets = tickets;
        this.applyFilters();
        this.loading = false;
      },
      error: err => {
        console.error('Error loading tickets', err);
        this.loading = false;
      }
    });
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        console.error('Error loading users', err);
      }
    });
  }

  injectDemoData() {
    this.tickets = [
      {
        id: 101,
        title: 'Demo: Cannot save profile',
        description: 'Profile save button does nothing.',
        status: 'open',
        assigneeId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 102,
        title: 'Demo: Reports page blank',
        description: 'No data shown on reports page.',
        status: 'in_progress',
        assigneeId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 103,
        title: 'Demo: Settings not saved',
        description: 'Settings changes are not persisted.',
        status: 'completed',
        assigneeId: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTickets = this.tickets.filter(ticket => {
      const statusMatch = this.statusFilter ? ticket.status === this.statusFilter : true;
      const assigneeMatch = this.assigneeFilter ? ticket.assigneeId === this.assigneeFilter : true;
      return statusMatch && assigneeMatch;
    });
  }

  onStatusFilterChange(value: string) {
    this.statusFilter = value;
    this.applyFilters();
  }

  onAssigneeFilterChange(value: number | '') {
    this.assigneeFilter = value;
    this.applyFilters();
  }

  getAssigneeName(assigneeId?: number): string {
    const user = this.users.find(u => u.id === assigneeId);
    return user ? user.name : '-';
  }

  viewDetails(ticket: Ticket) {
    this.router.navigate(['/tickets', ticket.id]);
  }
}
