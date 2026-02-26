"use client"

import { useState } from "react"
import { Button } from "primereact/button"
import { confirmDialog } from "primereact/confirmdialog"

import { Todo } from "../types/todo"
import { useTodoStore } from "../store/todoStore"
import { getPriorityColor } from "../utils/todoHelpers"

import EditTodoDialog from "./EditTodoDilalog"

export default function TodoItem({ todo }: { todo: Todo }) {

  const toggleStatus = useTodoStore((s) => s.toggleStatus)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)

  const [editOpen, setEditOpen] = useState(false)

  const onDelete = () => {

    confirmDialog({
      message: "Are you sure you want to delete this todo?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteTodo(todo.id),
    })
  }

  return (
    <>
      <div className="p-3 bg-zinc-900 rounded-md flex justify-between items-center">

        <div>

          <div className="font-semibold">{todo.title}</div>

          {todo.description && (
            <div className="text-sm text-zinc-400">
              {todo.description}
            </div>
          )}

          {todo.dueDate && (
            <div className="text-sm text-zinc-400">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </div>
          )}

          <div
            className={`text-xs px-2 py-1 rounded w-fit mt-1 ${getPriorityColor(todo.priority)}`}
          >
            {todo.priority}
          </div>

        </div>

        <div className="flex gap-2">

          <Button
            icon={todo.status === "completed"
              ? "pi pi-check"
              : "pi pi-hourglass"}
            onClick={() => toggleStatus(todo.id)}
          />

          <Button
            icon="pi pi-pencil"
            onClick={() => setEditOpen(true)}
          />

          <Button
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={onDelete}
          />

        </div>

      </div>

      <EditTodoDialog
        todo={todo}
        visible={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  )
}