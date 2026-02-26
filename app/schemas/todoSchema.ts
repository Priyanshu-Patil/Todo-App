import { z } from "zod"

export const todoSchema = z.object({

  title: z.string().min(1, "Title is required"),

  description: z.string().optional(),

  dueDate: z.date().nullable().optional(),

  priority: z.enum(["low", "medium", "high"])
})