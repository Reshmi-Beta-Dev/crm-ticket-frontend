export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed';
  assigneeId?: number;
  createdAt: string;
  updatedAt: string;
}
