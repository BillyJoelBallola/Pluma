import NoteList from "@/app/(pluma)/notes/NoteList";
import NoteEditor from "@/app/(pluma)/notes/NoteEditor";
import { getAllNotes } from "@/app/actions/notes/getAllNotes";
import { getNoteById } from "@/app/actions/notes/getNoteById";
import { StickyNote } from "lucide-react";

export const metadata = {
  title: "Notes",
};

export default async function Notes({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { noteId, addNew } = await searchParams;

  const allNotes = await getAllNotes();
  const note = noteId && (await getNoteById(parseInt(noteId)));

  return (
    <div className="flex h-[calc(100dvh-4.5rem)]">
      <div
        className={`p-4 border-r w-full md:w-lg overflow-y-auto ${
          noteId || addNew ? "hidden" : "block"
        } sm:block`}
      >
        <NoteList
          notes={allNotes}
          noteId={!noteId ? undefined : parseInt(noteId)}
        />
      </div>
      <div
        className={`p-4 w-full ${
          !noteId && !addNew ? "hidden" : "block"
        } sm:block`}
      >
        {!addNew && !noteId ? (
          <div className="border-3 border-dotted border-gray-300 dark:border-gray-800 rounded-lg grid place-items-center h-full">
            <div className="flex flex-col items-center text-center text-gray-300 dark:text-gray-800">
              <StickyNote size={120} strokeWidth={1} />
              <span className="text-sm">Open a note to view here</span>
            </div>
          </div>
        ) : addNew && !noteId ? (
          <NoteEditor /> //addnew
        ) : (
          <NoteEditor note={note} /> //edit
        )}
      </div>
    </div>
  );
}
