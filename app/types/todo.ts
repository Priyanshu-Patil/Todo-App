export type Priority = "low" | "medium" | "high"

export type status = "pending" | "completed"

export interface Todo {
    id: string,
    title: string,
    description?: string,
    dueDate?: string,
    priority: Priority,
    status: status,
    createdAt: string,
}