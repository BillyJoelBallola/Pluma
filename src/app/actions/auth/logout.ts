import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function logout(router: AppRouterInstance) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    await fetch(`${baseUrl}/api/auth`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    router.push("/login");
  } catch (err: unknown) {
    return console.error("Failed to logout.");
  }
}
