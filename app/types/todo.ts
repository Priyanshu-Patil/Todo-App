export type Priority = "low" | "medium" | "high"

export type Status = "pending" | "completed"

export interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: Priority
  status: Status
  createdAt: string
}