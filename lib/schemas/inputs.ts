import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email address.")
    .min(8, "Email must be at least 8 characters long.")
    .max(100, "Email must be at most 100 characters long."),
});

export const passwordSchema = z.object({
  password: z
    .string({ required_error: "Email is required." })
    .min(8, "Email must be at least 8 characters long.")
    .max(100, "Email must be at most 100 characters long."),
});

export const nameSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must be at most 100 characters long."),
});
