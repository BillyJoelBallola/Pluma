import { NoteSchemaType } from "@/zod-schemas/notes";
import { toast } from "sonner";

export async function saveNote(data: NoteSchemaType) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.message || "Something went wrong");
      return;
    }

    toast.success("Note saved successfully!");
  } catch (err: unknown) {
    toast.error("Failed to save note.");
  }
}
