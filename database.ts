export type Task = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
};

export type User = {
  _id: string;
  email: string;
  createdAt: string;
};