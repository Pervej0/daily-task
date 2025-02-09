import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    bio: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z
    .object({
      fullName: z.string().min(1, "Full name is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      bio: z.string(),
    })
    .partial(),
});
