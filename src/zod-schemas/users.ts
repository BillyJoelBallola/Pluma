import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().optional(),
  username: z.string().min(5, "Username is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password is required"),
});

//.date()OST (create): no ID
export const createUserSchema = userSchema.omit({ id: true });

// For PUT/PATCH (edit): with ID
export const updateUserSchema = userSchema;

// Types
export type Note = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserSchemaType = z.infer<typeof updateUserSchema>;
