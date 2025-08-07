import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { UserService } from '../services/user.service';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss'
})
export class TicketDetailComponent implements OnInit {
  ticket?: Ticket;
  users: User[] = [];
  selectedAssigneeId?: number;
  loading = true;
  updating = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.ticketService.getTicket(id).subscribe(ticket => {
      this.ticket = ticket;
      this.selectedAssigneeId = ticket.assigneeId;
      this.loading = false;
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  assignUser() {
    if (!this.ticket || !this.selectedAssigneeId) return;
    this.updating = true;
    this.ticketService.assignTicket(this.ticket.id, this.selectedAssigneeId).subscribe({
      next: ticket => {
        this.ticket = ticket;
        this.updating = false;
        this.snackBar.open('User assigned!', 'Close', { duration: 2000 });
      },
      error: () => {
        this.updating = false;
        this.snackBar.open('Failed to assign user', 'Close', { duration: 2000 });
      }
    });
  }

  markComplete() {
    if (!this.ticket) return;
    this.updating = true;
    this.ticketService.completeTicket(this.ticket.id).subscribe({
      next: ticket => {
        this.ticket = ticket;
        this.updating = false;
        this.snackBar.open('Ticket marked as complete!', 'Close', { duration: 2000 });
      },
      error: () => {
        this.updating = false;
        this.snackBar.open('Failed to mark as complete', 'Close', { duration: 2000 });
      }
    });
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }

  getAssigneeName(assigneeId?: number): string {
    const user = this.users.find(u => u.id === assigneeId);
    return user ? user.name : '-';
  }
}
