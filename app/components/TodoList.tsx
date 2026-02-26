"use client"

import { useState, useMemo } from "react"
import { Dropdown } from "primereact/dropdown"

import { useTodoStore } from "../store/todoStore"
import TodoItem from "./TodoItem"

export default function TodoList() {

  const todos = useTodoStore((s) => s.todos)

  const [statusFilter, setStatusFilter] =
    useState<"all" | "completed" | "pending">("all")

  const [priorityFilter, setPriorityFilter] =
    useState<"all" | "low" | "medium" | "high">("all")

  const [sortBy, setSortBy] =
    useState<"createdAt" | "dueDate">("createdAt")

  const filtered = useMemo(() => {

    let list = [...todos]

    if (statusFilter !== "all")
      list = list.filter((t) => t.status === statusFilter)

    if (priorityFilter !== "all")
      list = list.filter((t) => t.priority === priorityFilter)

    list.sort((a, b) => {

      if (sortBy === "dueDate") {

        const ad = a.dueDate
          ? new Date(a.dueDate).getTime()
          : Infinity

        const bd = b.dueDate
          ? new Date(b.dueDate).getTime()
          : Infinity

        return ad - bd
      }

      return new Date(a.createdAt).getTime()
        - new Date(b.createdAt).getTime()
    })

    return list

  }, [todos, statusFilter, priorityFilter, sortBy])

  return (
    <div>

      <div className="px-4 flex gap-3 mb-4">

        <Dropdown
          value={statusFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" }
          ]}
          onChange={(e) => setStatusFilter(e.value)}
        />

        <Dropdown
          value={priorityFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" }
          ]}
          onChange={(e) => setPriorityFilter(e.value)}
        />

        <Dropdown
          value={sortBy}
          options={[
            { label: "Created Date", value: "createdAt" },
            { label: "Due Date", value: "dueDate" }
          ]}
          onChange={(e) => setSortBy(e.value)}
        />

      </div>

      <div className="flex flex-col gap-3">

        {filtered.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}

      </div>

    </div>
  )
}