import { z } from "zod";

export const noteSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isArchive: z.number().int().optional(),
  tags: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

//.date()OST (create): no ID
export const createNoteSchema = noteSchema.omit({ id: true });

// For PUT/PATCH (edit): with ID
export const updateNoteSchema = noteSchema;

// Types
export type Note = z.infer<typeof noteSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type NoteSchemaType = z.infer<typeof updateNoteSchema>;
