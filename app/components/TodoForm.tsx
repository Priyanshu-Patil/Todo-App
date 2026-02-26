"use client"

import { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { Button } from "primereact/button"

import { todoSchema } from "../schemas/todoSchema"
import { useTodoStore } from "../store/todoStore"
import { Priority } from "../types/todo"

export default function TodoForm() {

  const addTodo = useTodoStore((s) => s.addTodo)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("low")
  const [dueDate, setDueDate] = useState<Date | null>(null)

  const handleSubmit = () => {

    const result = todoSchema.safeParse({
      title,
      description,
      dueDate,
      priority
    })

    if (!result.success) {
      alert(result.error.issues[0].message)
      return
    }

    addTodo({
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate: dueDate?.toISOString(),
      status: "pending",
      createdAt: new Date().toISOString()
    })

    setTitle("")
    setDescription("")
    setDueDate(null)
  }

  return (
    <div className="p-4 rounded-xl bg-zinc-800 flex flex-col gap-3">

      <InputText
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
      />

      <InputText
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <Calendar
        value={dueDate}
        onChange={(e) => setDueDate(e.value as Date)}
        placeholder="Select due date"
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

      <Button
        label="Add Todo"
        onClick={handleSubmit}
      />

    </div>
  )
}