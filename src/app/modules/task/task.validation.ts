import { z } from "zod";

export const taskValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format. Use YYYY-MM-DD",
  }),
});

export const updateTaskValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional(),
  dueDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format. Use YYYY-MM-DD",
    })
    .optional(),
});
