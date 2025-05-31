import { createUserSchema } from "@/zod-schemas/users";
import mysql from "mysql2/promise";
import { db } from "@/lib/db";

const connectionParams = db();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const connection = await mysql.createConnection(connectionParams);

    let query = "SELECT * FROM users WHERE id = ?";
    const params: any[] = [userId];

    const [rows] = await connection.execute(query, params);

    connection.end();

    return new Response(JSON.stringify((rows as any[])[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return new Response(JSON.stringify({ message: "Error fetching user" }), {
      status: 500,
    });
  }
}
