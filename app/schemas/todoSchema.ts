import { z } from "zod"

// Validation schema for form inputs
export const todoScheme = z.object({
    title: z.string().min(1, "Title is required"),

    description: z.string().optional(),

    dueDate: z.date().nullable(),

    priority: z.enum(["low", "medium", "high"])
})