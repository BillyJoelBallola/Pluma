import { z } from "zod";

// LOGIN SCHEMA
export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password is required"),
});

export const selectLoginSchema = loginSchema;
export type LoginInput = z.infer<typeof loginSchema>;

// REGISTER SCHEMA
export const registerSchema = z
  .object({
    username: z.string().min(5, "Username is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const selectRegisterSchema = registerSchema;
export type RegisterInput = z.infer<typeof registerSchema>;
