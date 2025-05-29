import { NoteSchemaType } from "@/zod-schemas/notes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

type Props = {
  data: NoteSchemaType;
  router: AppRouterInstance;
  toastSuccess: string;
  toastError: string;
  routePath: string;
};

export async function archiveNote({
  data,
  router,
  toastSuccess,
  toastError,
  routePath,
}: Props) {
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
    toast.success(toastSuccess);
    router.replace(routePath);
  } catch (err: unknown) {
    toast.error(toastError);
  }
}
