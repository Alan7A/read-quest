import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, deleteNote, editNote, getNotes } from "./notes";
import { CreateNoteConfig, DeleteNoteConfig, Note } from "types/Note";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: CreateNoteConfig) => createNote(note),
    onSuccess: (_, note) => {
      const { bookId } = note;
      queryClient.invalidateQueries(["notes", bookId]);
    },
  });
};

export const useGetNotes = (bookId: string) => {
  return useQuery({
    queryKey: ["notes", bookId],
    queryFn: () => getNotes(bookId),
  });
};

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: Note) => editNote(note),
    onSuccess: (_, note) => {
      const { bookId } = note;
      queryClient.invalidateQueries(["notes", bookId]);
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (config: DeleteNoteConfig) => deleteNote(config.noteId),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries(["notes", bookId]);
    },
  });
};
