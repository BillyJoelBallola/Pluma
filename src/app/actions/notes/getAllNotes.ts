import { NoteSchemaType } from "@/zod-schemas/notes";

export async function getAllNotes() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/notes`);
  const results = await response.json();
  const notes = results
    .filter(({ isArchive }: { isArchive: number }) => isArchive === 0)
    .map((note: NoteSchemaType) => ({
      ...note,
      createdAt: note.createdAt ? new Date(note.createdAt) : null,
    }));

  return notes;
}
