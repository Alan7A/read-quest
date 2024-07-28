import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, getNotes } from "./notes";
import { CreateNoteConfig } from "types/Note";

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
