import { Button, Image, Text, XStack, YStack } from "tamagui";
import { Book as BookIcon, Play } from "@tamagui/lucide-icons";
import { Book } from "types/Book";
import BookDetailsSection from "./BookDetailsSection";
import BookDetailsAbout from "./BookDetailsAbout";
import { Link } from "expo-router";
import { useGetSessions } from "api/sessions/sessions.hooks";
import SessionItem from "components/Sessions/SessionItem";
import NoteFormModal from "components/modals/NoteFormModal";
import { useGetNotes } from "api/notes/notes.hooks";
import NoteItem from "components/Notes/NoteItem";
import { useState } from "react";
import SessionFormModal from "components/modals/SessionFormModal";

interface Props {
  book: Book;
}

const BookDetails = (props: Props) => {
  const { book } = props;
  const { id, title, author, cover, pages, progress } = book;
  const { data: sessions } = useGetSessions(id);
  const { data: notes } = useGetNotes(id);
  const [isNoteFormModalOpen, setIsNoteFormModalOpen] = useState(false);
  const [isSessionFormModalOpen, setIsSessionFormModalOpen] = useState(false);

  return (
    <YStack f={1} p="$4" gap="$4">
      <YStack alignItems="center">
        {cover ? (
          <Image
            source={{
              uri: cover,
              width: 112.5,
              height: 168,
            }}
            borderRadius="$2"
          />
        ) : (
          <Button icon={BookIcon} w={112.5} h={168} scaleIcon={1.5} />
        )}

        <Text fontSize={20} textAlign="center">
          {title}
        </Text>
        <Text color="$color075">{author}</Text>
      </YStack>

      <YStack
        gap="$4"
        backgroundColor="$backgroundHover"
        borderRadius="$4"
        p="$4"
        ai="center"
        w="100%"
      >
        <YStack ai="center" gap="$2">
          <Link
            href={{
              pathname: "/reading-session-modal",
              params: { bookJson: JSON.stringify(book) },
            }}
            asChild
          >
            <Button icon={Play} size={98} borderRadius={999} />
          </Link>
          <Text>Start session</Text>
        </YStack>
        <XStack jc="space-between" w="80%">
          <YStack ai="center">
            <Text color="$color10" fontSize={12}>
              Current page
            </Text>
            <Text>
              {progress} / {pages}
            </Text>
          </YStack>
          <YStack ai="center">
            <Text color="$color10" fontSize={12}>
              Time elapsed
            </Text>
            <Text>16:05</Text>
          </YStack>
        </XStack>
      </YStack>

      <BookDetailsSection
        name="Sessions"
        seeAllHref={`/books/${id}/sessions`}
        isEmpty={!sessions?.length}
        onAddNew={() => setIsSessionFormModalOpen(true)}
      >
        {sessions?.slice(0, 3).map((session) => (
          <SessionItem key={session.id} session={session} />
        ))}
      </BookDetailsSection>
      <BookDetailsSection
        name="Notes"
        seeAllHref={`/books/${id}/notes`}
        isEmpty={!sessions?.length}
        onAddNew={() => {
          setIsNoteFormModalOpen(true);
        }}
      >
        {notes?.slice(0, 3).map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </BookDetailsSection>
      <BookDetailsAbout book={book} />
      <NoteFormModal
        bookId={id}
        isOpen={isNoteFormModalOpen}
        onClose={() => setIsNoteFormModalOpen(false)}
      />
      <SessionFormModal
        bookId={book.id}
        book={book}
        isOpen={isSessionFormModalOpen}
        onClose={() => setIsSessionFormModalOpen(false)}
      />
    </YStack>
  );
};

export default BookDetails;
