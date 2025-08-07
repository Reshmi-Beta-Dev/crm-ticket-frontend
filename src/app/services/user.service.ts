import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

const DEMO_USERS: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
];

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(DEMO_USERS).pipe(delay(300));
  }
}
