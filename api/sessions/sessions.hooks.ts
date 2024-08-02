import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createSession,
  deleteSession,
  editSession,
  getSessions,
} from "./sessions";
import {
  CreateSessionConfig,
  DeleteSessionConfig,
  Session,
} from "types/Session";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (session: CreateSessionConfig) => createSession(session),
    onSuccess: (_, session) => {
      const { bookId } = session;
      queryClient.invalidateQueries(["sessions", bookId]);
      queryClient.invalidateQueries(["books", bookId]);
    },
  });
};

export const useGetSessions = (bookId: string) => {
  return useQuery({
    queryKey: ["sessions", bookId],
    queryFn: () => getSessions(bookId),
  });
};

export const useEditSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (session: Session) => editSession(session),
    onSuccess: (_, session) => {
      const { bookId } = session;
      queryClient.invalidateQueries(["sessions", bookId]);
      queryClient.invalidateQueries(["books", bookId]);
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (config: DeleteSessionConfig) =>
      deleteSession(config.sessionId),
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries(["sessions", bookId]);
    },
  });
};
