import { Book as BookIcon, Play } from "@tamagui/lucide-icons";
import { useGetNotes } from "api/notes/notes.hooks";
import { useGetSessions } from "api/sessions/sessions.hooks";
import NoteItem from "components/Notes/NoteItem";
import SessionItem from "components/Sessions/SessionItem";
import NoteFormModal from "components/modals/NoteFormModal";
import SessionFormModal from "components/modals/SessionFormModal";
import dayjs from "dayjs";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Button, Image, Text, XStack, YStack } from "tamagui";
import type { Book } from "types/Book";
import { getTotalReadingTime } from "utils/utils";
import BookDetailsAbout from "./BookDetailsAbout";
import BookDetailsOptionsSheet from "./BookDetailsOptionsSheet";
import BookDetailsSection from "./BookDetailsSection";

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
  const [isOptionsSheetOpen, setIsOptionsSheetOpen] = useState(false);
  const isFinished = book.status === "finished";

  return (
    <YStack f={1} p="$4" gap="$4">
      <Stack.Screen
        options={{
          title: "",
          headerRight: () => (
            <Button
              fontSize={24}
              chromeless
              pt="$2"
              onPress={() => setIsOptionsSheetOpen(true)}
            >
              ⋮
            </Button>
          )
        }}
      />
      <YStack alignItems="center">
        {cover ? (
          <Image
            source={{
              uri: cover,
              width: 112.5,
              height: 168
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
              params: { bookJson: JSON.stringify(book) }
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
            {isFinished ? (
              <>
                <Text color="$color10" fontSize={12}>
                  Finish date
                </Text>
                <Text>{dayjs(book.statusDate).format("L")}</Text>
              </>
            ) : (
              <>
                <Text color="$color10" fontSize={12}>
                  Time elapsed
                </Text>
                <Text>{getTotalReadingTime(sessions)}</Text>
              </>
            )}
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
      <BookDetailsOptionsSheet
        isOpen={isOptionsSheetOpen}
        setIsOpen={setIsOptionsSheetOpen}
        book={book}
      />
    </YStack>
  );
};

export default BookDetails;
