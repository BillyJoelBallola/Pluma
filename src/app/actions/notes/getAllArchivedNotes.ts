import { NoteSchemaType } from "@/zod-schemas/notes";

export async function getAllArchivedNotes() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/notes`);
  const results = await response.json();
  const archivedNotes = results
    .filter(({ isArchive }: { isArchive: number }) => isArchive === 1)
    .map((note: NoteSchemaType) => ({
      ...note,
      createdAt: note.createdAt ? new Date(note.createdAt) : null,
    }));

  return archivedNotes;
}
