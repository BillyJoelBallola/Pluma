import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

type Props = {
  noteId: number | undefined;
  router: AppRouterInstance;
  routePath: string;
};

export async function deleteNote({ noteId, router, routePath }: Props) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/notes?noteId=${noteId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.message || "Failed to delete note.");
      return;
    }

    toast.success("Note deleted successfully!");
    router.replace(routePath);
  } catch (err: unknown) {
    toast.error("An error occurred while deleting the note.");
  }
}
