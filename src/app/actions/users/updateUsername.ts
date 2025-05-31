import { verifyUser } from "@/lib/verifyUser";
import { toast } from "sonner";

type Props = {
  username: string;
};

export async function updateUsername(data: Props) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    if (data.username === "") {
      return toast.error("Fill up all fields.");
    }

    const userId = await verifyUser();
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateUsername",
        userId: userId,
        ...data,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      return toast.error(json.message || "Something went wrong.");
    }

    return toast.success("Username updated successfully!");
  } catch (err: unknown) {
    toast.error("Failed to update username.");
  }
}
