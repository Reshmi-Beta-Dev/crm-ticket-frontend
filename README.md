# CRM Ticket Frontend (Angular)

A simple ticket management system built with Angular. This project demonstrates:
- Viewing, filtering, and managing tickets
- Assigning users to tickets
- Marking tickets as complete
- Angular Material UI
- Hardcoded demo data (no backend required)

## Features
- Ticket List: View all tickets, filter by status or assignee
- Ticket Detail: View ticket details, assign user, mark as complete
- Responsive, Material-styled UI
- No backend required: all data is hardcoded in the frontend

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
```sh
cd crm-ticket-frontend
npm install
npm start
```

Open your browser at [http://localhost:4200/tickets](http://localhost:4200/tickets)
<img width="1918" height="750" alt="image" src="https://github.com/user-attachments/assets/a3637b4b-6437-465f-9db1-f40d01bd86fa" />


## Project Structure
- `src/app/services/` — Hardcoded demo data for tickets and users
- `src/app/tickets/` — Ticket list and detail components
- `src/app/models/` — Data models

## Customization
- To change demo data, edit `src/app/services/ticket.service.ts` and `src/app/services/user.service.ts`.

## License
MIT
