import { createUserSchema } from "@/zod-schemas/users";
import mysql from "mysql2/promise";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const connectionParams = db();

export async function PUT(req: Request) {
  const body = await req.json();
  const { action } = body;

  switch (action) {
    case "updatePassword":
      return updatePassword(body);
    case "updateUsername":
      return updateUsername(body);
    default:
      return new Response(JSON.stringify({ message: "Invalid action" }), {
        status: 400,
      });
  }
}

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

export async function updatePassword(body: any) {
  try {
    const { userId, currentPassword, newPassword, confirmPassword } = body;

    const connection = await mysql.createConnection(connectionParams);

    const [userResults] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );

    if ((userResults as any[]).length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const userData = (userResults as any[])[0];

    const validPassword = await bcrypt.compare(
      currentPassword,
      userData.password
    );

    if (!validPassword) {
      return new Response(
        JSON.stringify({ message: "Current password is incorrect." }),
        {
          status: 401,
        }
      );
    }

    if (newPassword === currentPassword) {
      return new Response(
        JSON.stringify({
          message:
            "New password must not be the same with the current password.",
        }),
        {
          status: 401,
        }
      );
    }

    if (newPassword !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "Confirm password didn't match new password.",
        }),
        {
          status: 401,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);
    await connection.execute("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userData.id,
    ]);

    connection.end();

    return new Response(JSON.stringify({ message: "Password updated" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error updating password" }),
      {
        status: 500,
      }
    );
  }
}

export async function updateUsername(body: any) {
  try {
    const { userId, username } = body;

    const connection = await mysql.createConnection(connectionParams);

    const [userResults] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );

    if ((userResults as any[]).length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const userData = (userResults as any[])[0];

    if (username === userData.username) {
      return new Response(
        JSON.stringify({
          message:
            "New username must not be the same with the current username.",
        }),
        {
          status: 401,
        }
      );
    }

    if (username.length <= 5 || username.length >= 15) {
      return new Response(
        JSON.stringify({
          message: "Username must be greater than to 5 characters.",
        }),
        {
          status: 401,
        }
      );
    }

    await connection.execute("UPDATE users SET username = ? WHERE id = ?", [
      username,
      userData.id,
    ]);

    connection.end();

    return new Response(JSON.stringify({ message: "Username updated" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error updating username" }),
      {
        status: 500,
      }
    );
  }
}
