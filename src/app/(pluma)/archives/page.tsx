import { getAllArchivedNotes } from "@/app/actions/notes/getAllArchivedNotes";
import { StickyNote } from "lucide-react";
import { NoteSchemaType } from "@/zod-schemas/notes";
import ViewNote from "@/app/(pluma)/archives/ViewNote";
import ArchivedNoteList from "@/app/(pluma)/archives/ArchivedNoteList";

export const metadata = {
  title: "Archives",
};

export default async function Archives({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { noteId } = await searchParams;
  const allArchivedNotes = await getAllArchivedNotes();

  const archivedNote = noteId
    ? allArchivedNotes?.find(
        (note: NoteSchemaType) => note.id === parseInt(noteId)
      )
    : undefined;

  return (
    <div className="flex h-[calc(100dvh-4.5rem)]">
      <div
        className={`p-4 border-r w-full md:w-lg overflow-y-auto ${
          noteId ? "hidden" : "block"
        } sm:block`}
      >
        <ArchivedNoteList
          notes={allArchivedNotes}
          noteId={!noteId ? undefined : parseInt(noteId)}
        />
      </div>
      <div className={`p-4 w-full ${!noteId ? "hidden" : "block"} sm:block`}>
        {!noteId ? (
          <div className="border-3 border-dotted border-gray-300 dark:border-gray-800 rounded-lg grid place-items-center h-full">
            <div className="flex flex-col items-center text-center text-gray-300 dark:text-gray-800">
              <StickyNote size={120} strokeWidth={1} />
              <span className="text-sm">Open a note to view here</span>
            </div>
          </div>
        ) : (
          <ViewNote note={archivedNote} />
        )}
      </div>
    </div>
  );
}
