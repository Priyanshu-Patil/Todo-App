import { Priority } from "../types/todo"

export function getPriorityColor(priority: Priority) {

  if (priority === "high") return "bg-red-500 text-white"

  if (priority === "medium") return "bg-yellow-500 text-white"

  return "bg-green-500 text-white"
}