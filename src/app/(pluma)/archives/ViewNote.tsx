"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArchiveRestore, Clock, Tag, Trash2 } from "lucide-react";
import { NoteSchemaType } from "@/zod-schemas/notes";
import { archiveNote } from "@/app/actions/notes/archiveNote";
import { deleteNote } from "@/app/actions/notes/deleteNote";

import AutoResizingTextArea from "@/components/AutoResizingTextArea";
import DialogBox from "@/components/DialogBox";
import Link from "next/link";

export default function ViewNote({ note }: { note?: NoteSchemaType }) {
  const searchParams = useSearchParams();
  const addNew = searchParams.has("addNew");
  const router = useRouter();

  const arvhiveNote: NoteSchemaType = {
    id: note?.id ?? 0,
    title: note?.title ?? "",
    content: note?.content ?? "",
    tags: note?.tags ?? "",
  };

  const restore = () => {
    const restoreData = { isArchive: 0, ...arvhiveNote };
    archiveNote({
      data: restoreData,
      toastSuccess: "Note save to restore successfully!",
      toastError: "Failed to restore note.",
      routePath: "/archives",
      router,
    });
  };

  const deleteNoteFn = () => {
    const noteId = arvhiveNote.id;
    deleteNote({ noteId, router, routePath: "/archives" });
  };

  return (
    <div className="h-[calc(100dvh-10rem)] overflow-y-auto">
      {/* mobile view header */}
      <div className="sm:hidden flex border-b pb-2 items-center justify-between">
        <Link href={"/archives"} className="underline pb-2">
          Go back
        </Link>
        {!addNew ? (
          <div className="flex">
            <DialogBox
              title="Restore"
              description="Are you sure you want to restore this note?"
              onClick={() => restore()}
              icon={ArchiveRestore}
            />
            <DialogBox
              title="Delete"
              description="Are you sure you want to delete this note?"
              onClick={() => deleteNoteFn()}
              variant={"destructive"}
              icon={Trash2}
            />
          </div>
        ) : null}
      </div>

      {/* Note header */}
      {!addNew ? (
        <div className="sm:flex border-b pb-2 hidden">
          <DialogBox
            title="Restore"
            description="Are you sure you want to restore this note?"
            onClick={() => restore()}
            icon={ArchiveRestore}
          />
          <DialogBox
            title="Delete"
            description="Are you sure you want to delete this note?"
            onClick={() => deleteNoteFn()}
            variant={"destructive"}
            icon={Trash2}
          />
        </div>
      ) : null}

      {/* Title and meta */}
      <div className={`grid gap-4 border-b ${!addNew ? "py-4" : "pb-4"} `}>
        <h1 className="text-3xl font-bold">{note?.title}</h1>

        <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr] text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Tag className="size-4" />
              <p>Tags</p>
            </div>
            {note?.updatedAt && (
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <p>Last Edited</p>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <p>{note?.tags}</p>
            {note?.updatedAt && (
              <p>
                {new Date(note?.updatedAt)?.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Note content */}
      {note?.content && (
        <AutoResizingTextArea
          className="font-normal text-sm mt-4"
          value={note.content}
          disabled={true}
        />
      )}
    </div>
  );
}
