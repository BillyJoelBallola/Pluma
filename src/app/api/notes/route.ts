import { createNoteSchema } from "@/zod-schemas/notes";
import mysql from "mysql2/promise";
import { db } from "@/lib/db";
import { z } from "zod";

const connectionParams = db();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");
    const userId = searchParams.get("userId");

    const connection = await mysql.createConnection(connectionParams);

    let query =
      "SELECT notes.* FROM notes JOIN users ON userId = users.id WHERE userId = ?";
    const params: any[] = [userId];

    if (noteId) {
      query += " AND notes.id = ?";
      params.push(noteId);
    } else {
      query += " ORDER BY notes.id DESC";
    }

    const [rows] = await connection.execute(query, params);

    connection.end();

    if (noteId && (rows as any[]).length === 0) {
      return new Response(JSON.stringify({ message: "Note not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(noteId ? (rows as any[])[0] : rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
    return new Response(JSON.stringify({ message: "Error fetching notes" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createNoteSchema.parse(body);

    const connection = await mysql.createConnection(connectionParams);

    const [result] = await connection.execute(
      "INSERT INTO notes (userId, title, content, tags) VALUES (?, ?, ?, ?)",
      [parsed.userId, parsed.title, parsed.content, parsed.tags]
    );

    connection.end();

    const insertedNote = {
      id: (result as any).insertId,
      ...parsed,
    };

    return new Response(JSON.stringify(insertedNote), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          message: "Invalid input",
          errors: err.errors,
        }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, isArchive, tags } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing note ID" }), {
        status: 400,
      });
    }

    const connection = await mysql.createConnection(connectionParams);

    await connection.execute(
      "UPDATE notes SET title = ?, content = ?, tags = ?, isArchive = ?, updatedAt = ? WHERE id = ?",
      [title, content, tags, isArchive, new Date(), id]
    );

    connection.end();

    return new Response(JSON.stringify({ message: "Note updated" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error updating note" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");

    if (!noteId) {
      return new Response(JSON.stringify({ message: "Missing note ID" }), {
        status: 400,
      });
    }

    const connection = await mysql.createConnection(connectionParams);
    await connection.execute("DELETE FROM notes WHERE id = ?", [noteId]);
    connection.end();

    return new Response(JSON.stringify({ message: "Note deleted" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error deleting note" }), {
      status: 500,
    });
  }
}
