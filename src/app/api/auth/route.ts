import { createUserSchema } from "@/zod-schemas/users";
import mysql from "mysql2/promise";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const connectionParams = db();
const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "session_token";
const MAX_AGE = 60 * 60 * 24 * 7;

function createToken(user: { id: number; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: MAX_AGE });
}

// POST: Register User
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const parsed = createUserSchema.parse(body);

    if (body.password !== body.confirmPassword) {
      return new Response(
        JSON.stringify({ error: "Passwords do not match." }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const connection = await mysql.createConnection(connectionParams);

    const isEmailExisiting: any = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [parsed.email]
    );

    if (isEmailExisiting[0].length !== 0) {
      return new Response(
        JSON.stringify({ error: "Email is already registered." }),
        {
          status: 409,
        }
      );
    }

    const [result]: any = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [parsed.username, parsed.email, hashedPassword]
    );

    await connection.end();

    const userId = result.insertId;

    const token = createToken({ id: userId, email: parsed.email });

    cookieStore.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: MAX_AGE,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in POST /api/auth:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}

// POST: Login User
export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const { email, password } = body;

    const connection = await mysql.createConnection(connectionParams);
    const [rows]: any = await connection.execute(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );

    await connection.end();

    const user = rows[0];
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return new Response(JSON.stringify({ error: "Password incorrect." }), {
        status: 401,
      });
    }

    const token = createToken({ id: user.id, email: user.email });

    cookieStore.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: MAX_AGE,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in PUT /api/auth:", error);
    return new Response(JSON.stringify({ error: "Login failed." }), {
      status: 500,
    });
  }
}

export async function DELETE() {
  (await cookies()).delete(COOKIE_NAME);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
