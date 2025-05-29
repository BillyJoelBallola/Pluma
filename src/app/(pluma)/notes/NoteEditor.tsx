"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { newNote } from "@/app/actions/notes/newNote";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, Clock, Loader, Tag, Trash2 } from "lucide-react";
import { createNoteSchema, NoteSchemaType } from "@/zod-schemas/notes";
import { saveNote } from "@/app/actions/notes/saveNote";
import { archiveNote } from "@/app/actions/notes/archiveNote";
import { deleteNote } from "@/app/actions/notes/deleteNote";
import { Button } from "@/components/ui/button";

import AutoResizingTextArea from "@/components/AutoResizingTextArea";
import DialogBox from "@/components/DialogBox";
import Link from "next/link";

export default function NoteEditor({ note }: { note?: NoteSchemaType }) {
  const searchParams = useSearchParams();
  const hasNoteId = searchParams.has("noteId");
  const addNew = searchParams.has("addNew");
  const router = useRouter();

  const emptyValues: NoteSchemaType = {
    id: 0,
    title: "",
    content: "",
    tags: "",
  };

  const defaultValues: NoteSchemaType = hasNoteId
    ? {
        id: note?.id ?? 0,
        title: note?.title ?? "",
        content: note?.content ?? "",
        tags: note?.tags ?? "",
      }
    : emptyValues;

  useEffect(() => {
    reset(hasNoteId ? defaultValues : emptyValues);
  }, [searchParams.get("noteId")]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(createNoteSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: NoteSchemaType) => {
    if (addNew) {
      newNote(data, reset, router);
    }

    if (!addNew && hasNoteId) {
      const updatedData = {
        id: defaultValues.id,
        isArchive: 0,
        ...data,
      };
      saveNote(updatedData);
      router.refresh();
    }
  };

  const archive = () => {
    const archiveData = { isArchive: 1, ...defaultValues };
    archiveNote({
      data: archiveData,
      toastSuccess: "Note save to archives successfully!",
      toastError: "Failed to archive note.",
      routePath: "/notes",
      router,
    });
  };

  const deleteNoteFn = () => {
    const noteId = defaultValues.id;
    deleteNote({ noteId, router, routePath: "/notes" });
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message.toString());
      }
    });
  }, [errors]);

  return (
    <>
      <form
        id="noteEditor"
        onSubmit={handleSubmit(onSubmit)}
        className="h-[calc(100dvh-10rem)] overflow-y-auto"
      >
        {/* mobile view header */}
        <div className="sm:hidden flex border-b pb-2 items-center justify-between">
          <Link href={"/notes"} className="underline pb-2">
            Go back
          </Link>
          {!addNew ? (
            <div className="flex">
              <DialogBox
                title="Archive"
                description="Are you sure you want to archive this note?"
                onClick={() => archive()}
                icon={Archive}
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
              title="Archive"
              description="Are you sure you want to archive this note?"
              onClick={() => archive()}
              icon={Archive}
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
          <AutoResizingTextArea
            placeholder="Title"
            id="title"
            {...register("title", { required: "Title is required" })}
          />

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
              <input
                type="text"
                id="tags"
                className="border-0 outline-0 w-full"
                placeholder="e.g. Personal, Work, Health"
                {...register("tags")}
              />
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
        <AutoResizingTextArea
          className="font-normal text-sm mt-4"
          placeholder="Start typing..."
          {...register("content", { required: "Content is required" })}
        />
      </form>

      {/* Note footer */}
      <div className="py-4 flex gap-2 justify-end border-t">
        <div className="flex gap-2 items-center">
          <Button
            disabled={isSubmitting}
            type="submit"
            form="noteEditor"
            variant="default"
            className="dark:text-white bg-blue-800 hover:bg-blue-700 duration-150"
          >
            {isSubmitting ? <Loader className="animate-spin" /> : "Save Note"}
          </Button>

          <Button
            disabled={isSubmitting}
            type="button"
            variant="default"
            onClick={() => reset()}
            className="dark:text-white bg-gray-800 hover:bg-gray-700 duration-150"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
