import { verifyUser } from "@/lib/verifyUser";
import { toast } from "sonner";

type Props = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function updatePassword(formData: Props) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    if (
      formData.currentPassword === "" ||
      formData.newPassword === "" ||
      formData.confirmPassword === ""
    ) {
      return toast.error("Fill up all fields.");
    }

    const userId = await verifyUser();
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updatePassword",
        userId: userId,
        ...formData,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      return toast.error(json.message || "Something went wrong.");
    }

    return toast.success("Password updated successfully!");
  } catch (err: unknown) {
    toast.error("Failed to update password.");
  }
}
