import { create } from "zustand"
import { Todo } from "../types/todo"

interface TodoState {
    todos: Todo[],

    addTodo: (todo: Todo) => void

    deleteTodo: (id: string) => void

    updateTodo: (id: string, data: Partial<Todo>) => void

    toggleStatus: (id: string) => void
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    // Add a new todo
    addTodo: (todo: Todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),

    // Delete a todo by id
    deleteTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),

    // Update a todo by id
    updateTodo: (id: string, data: Partial<Todo>) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...data } : todo
            ),
        })),

    // Toggle todo status between pending and completed
    toggleStatus: (id: string) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          status: todo.status === "pending" ? "completed" : "pending",
                      }
                    : todo
            ),
        })),
}))