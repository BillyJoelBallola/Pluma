"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { toast } from "sonner";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token");

  if (!sessionToken) {
    return toast.error("Unauthorized Access");
  }

  const { payload } = await jwtVerify(sessionToken.value, JWT_SECRET);
  const userId = payload.id as number;

  return userId;
}
