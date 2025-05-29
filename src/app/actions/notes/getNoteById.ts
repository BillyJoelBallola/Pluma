export const getNoteById = async (noteId: number) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/notes?noteId=${noteId}`);
  if (!response.ok) throw new Error("Note not found");
  const note = await response.json();

  return note;
};
