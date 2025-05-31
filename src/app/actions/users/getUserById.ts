import { verifyUser } from "@/lib/verifyUser";
import { toast } from "sonner";

export async function getUserById() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const userId = await verifyUser();
    const response = await fetch(`${baseUrl}/api/users?userId=${userId}`);
    const user = await response.json();
    return user;
  } catch (error: unknown) {
    return toast.error("User not found");
  }
}
