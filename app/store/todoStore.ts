import { create } from "zustand"
import { Todo } from "../types/todo"

interface TodoState {

  todos: Todo[]

  addTodo: (todo: Todo) => void

  deleteTodo: (id: string) => void

  updateTodo: (id: string, data: Partial<Todo>) => void

  toggleStatus: (id: string) => void
}

export const useTodoStore = create<TodoState>((set) => ({

  todos: [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo]
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id)
    })),

  updateTodo: (id, data) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...data } : t
      )
    })),

  toggleStatus: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "pending"
                ? "completed"
                : "pending"
            }
          : t
      )
    }))
}))