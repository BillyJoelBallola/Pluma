import { verifyUser } from "@/lib/verifyUser";
import { NoteSchemaType } from "@/zod-schemas/notes";
import { toast } from "sonner";

export async function getAllArchivedNotes() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const userId = await verifyUser();
    const response = await fetch(`${baseUrl}/api/notes?userId=${userId}`);
    const results = await response.json();

    const notes = results
      .filter(({ isArchive }: { isArchive: number }) => isArchive === 1)
      .map((note: NoteSchemaType) => ({
        ...note,
        createdAt: note.createdAt ? new Date(note.createdAt) : null,
      }));

    return notes;
  } catch (error: unknown) {
    return toast.error("No archived notes found");
  }
}
