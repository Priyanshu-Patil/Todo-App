"use client"

import { useState } from "react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"

import { Todo, Priority } from "../types/todo"
import { useTodoStore } from "../store/todoStore"

export default function EditTodoDialog({
  todo,
  visible,
  onClose
}: {
  todo: Todo
  visible: boolean
  onClose: () => void
}) {

  const updateTodo = useTodoStore((s) => s.updateTodo)

  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || "")
  const [priority, setPriority] = useState<Priority>(todo.priority)
  const [dueDate, setDueDate] = useState<Date | null>(
    todo.dueDate ? new Date(todo.dueDate) : null
  )

  const save = () => {

    updateTodo(todo.id, {
      title,
      description,
      priority,
      dueDate: dueDate?.toISOString()
    })

    onClose()
  }

  return (
    <Dialog
      header="Edit Todo"
      visible={visible}
      onHide={onClose}
      style={{ width: "400px" }}
    >

      <div className="flex flex-col gap-3">

        <InputText
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputText
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Calendar
          value={dueDate}
          onChange={(e) => setDueDate(e.value as Date)}
        />

        <Dropdown
          value={priority}
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" }
          ]}
          onChange={(e) => setPriority(e.value)}
        />

        <Button label="Save" onClick={save} />

      </div>

    </Dialog>
  )
}