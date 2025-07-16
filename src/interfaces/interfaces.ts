export interface UserInfo {
  _id: string;
}

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  extras?: Record<string, any>;
  created_at: string;
};

export type TaskStatus = "pending" | "in-progress" | "done";
