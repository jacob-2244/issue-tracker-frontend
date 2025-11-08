export interface Issue {
  _id?: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignee: string;
  createdAt?: string;
  updatedAt?: string;
}


