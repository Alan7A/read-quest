import { useMutation, useQuery, useQueryClient } from "react-query";
import { createSession, getSessions } from "./sessions";
import { CreateSessionConfig } from "types/Session";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (session: CreateSessionConfig) => createSession(session),
    onSuccess: (_, session) => {
      const { bookId } = session;
      queryClient.invalidateQueries(["sessions", bookId]);
    },
  });
};

export const useGetSessions = (bookId: string) => {
  return useQuery({
    queryKey: ["sessions", bookId],
    queryFn: () => getSessions(bookId),
  });
};
