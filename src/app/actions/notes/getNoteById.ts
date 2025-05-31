import { verifyUser } from "@/lib/verifyUser";
import { toast } from "sonner";

export async function getNoteById(noteId: number) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const userId = await verifyUser();
    const response = await fetch(
      `${baseUrl}/api/notes?noteId=${noteId}&userId=${userId}`
    );
    const note = await response.json();
    return note;
  } catch (error: unknown) {
    return toast.error("Note not found");
  }
}
