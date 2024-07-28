import { Plus } from "@tamagui/lucide-icons";
import NoteFormModal from "components/modals/NoteFormModal";
import Notes from "components/Notes/Notes";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, View } from "tamagui";

const NotesScreen = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const [isNoteFormModalOpen, setIsNoteFormModalOpen] = useState(false);

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Notes",
          headerRight: () => (
            <Button
              icon={<Plus size={24} />}
              mr="$2"
              chromeless
              onPress={() => setIsNoteFormModalOpen(true)}
            />
          ),
        }}
      />
      <Notes bookId={bookId!} />
      <NoteFormModal
        bookId={bookId!}
        isOpen={isNoteFormModalOpen}
        onClose={() => setIsNoteFormModalOpen(false)}
      />
    </View>
  );
};

export default NotesScreen;
