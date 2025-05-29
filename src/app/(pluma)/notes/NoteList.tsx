"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NoteSchemaType } from "@/zod-schemas/notes";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function NoteList({
  notes,
  noteId,
}: {
  notes?: NoteSchemaType[];
  noteId: number | undefined;
}) {
  const [searchText, setSearchText] = useState<string>("");

  const filteredNotes = useMemo(() => {
    if (searchText) {
      return notes?.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      return notes;
    }
  }, [searchText, notes]);

  return (
    <>
      <div className="grid gap-2">
        <Link href={"/notes?addNew=true"}>
          <Button
            value="default"
            className="bg-blue-700 hover:bg-blue-600 duration-150 cursor-pointer w-full text-white"
          >
            <Plus />
            <span>Create New Note</span>
          </Button>
        </Link>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by titles"
        />
      </div>
      <div className="mt-4">
        {filteredNotes?.map((note) => (
          <Link
            href={`/notes?noteId=${note.id}`}
            key={note.title}
            className={`grid gap-3 p-2 sm:p-4 hover:rounded-sm not-last:border-b hover:bg-gray-100 dark:hover:bg-gray-900 ${
              note.id === noteId && "bg-gray-100 dark:bg-gray-900"
            }`}
          >
            <h1 className="text-xl font-bold">{note.title}</h1>
            <div className="flex gap-1 flex-wrap">
              {note.tags?.split(",").map((tag) => (
                <div
                  key={tag}
                  className="shadow-sm text-sm rounded-sm bg-gray-200 dark:bg-gray-800 px-2"
                >
                  <p>{tag}</p>
                </div>
              ))}
            </div>
            <span className="text-sm">
              {note.createdAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
