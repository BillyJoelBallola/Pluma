import { verifyUser } from "@/lib/verifyUser";
import { NoteSchemaType } from "@/zod-schemas/notes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

export async function newNote(
  data: NoteSchemaType,
  reset: UseFormReset<NoteSchemaType>,
  router: AppRouterInstance
) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const userId = await verifyUser();
    const res = await fetch(`${baseUrl}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, ...data }),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.message || "Something went wrong");
      return;
    }

    toast.success("Note created successfully!");

    reset();

    router.replace(`/notes?noteId=${json.id}`);
  } catch (err: unknown) {
    toast.error("Failed to create note.");
  }
}
