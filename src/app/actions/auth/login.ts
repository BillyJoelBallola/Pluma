import { LoginInput } from "@/zod-schemas/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export async function login(data: LoginInput, router: AppRouterInstance) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/auth`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return toast.error(json.error || "Something went wrong");
    }

    router.push("/notes");
  } catch (err: unknown) {
    return toast.error("Failed to login.");
  }
}
