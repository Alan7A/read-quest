import { BookCheck, BookmarkPlus, Pencil, Trash2 } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useDeleteBook, useEditBook } from "api/books/books.hooks";
import AlertModal from "components/modals/AlertModal";
import Sheet from "components/sheets/Sheet";
import { router } from "expo-router";
import { useState } from "react";
import { ListItem, YStack } from "tamagui";
import { Book } from "types/Book";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  book: Book;
}

const BookDetailsOptionsSheet = (props: Props) => {
  const { book, isOpen, setIsOpen } = props;
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const { mutate: editBook } = useEditBook();
  const { mutate: deleteBook } = useDeleteBook();
  const toast = useToastController();

  /**
   * TODO:
   * - Al cambiar un libro de reading a wantoread el query de reading no se invalida bien
   * - Cuando un libro es finished o wantToRead agregar alguna forma de regresarlo a reading
   * - Utilizar una api key de google books porque ya no funcionan los queries de google
   */

  const onEdit = () => {
    setIsOpen(false);
    router.push({
      pathname: "/books/add",
      params: { bookJson: JSON.stringify(book), isEdit: "true" }
    });
  };

  const wantToReadHandler = () => {
    setIsOpen(false);
    editBook({
      ...book,
      status: "wantToRead",
      statusDate: new Date().toISOString()
    });
    toast.show("Book set as want to read", { customData: { type: "success" } });
  };

  const finishedHandler = () => {
    setIsOpen(false);
    editBook({
      ...book,
      status: "finished",
      statusDate: new Date().toISOString()
    });
    toast.show("Book set as finished", { customData: { type: "success" } });
  };

  const onDelete = () => {
    setIsOpen(false);
    setIsAlertModalOpen(true);
  };

  const deleteHandler = () => {
    deleteBook(book.id);
    setIsAlertModalOpen(false);
  };

  return (
    <Sheet
      title="Book options"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      snapPoints={[32]}
    >
      <YStack>
        <ListItem
          pl="$0"
          icon={BookmarkPlus}
          onPress={wantToReadHandler}
          title="Set as want to read"
        />
        <ListItem
          pl="$0"
          icon={BookCheck}
          onPress={finishedHandler}
          title="Set as finished"
        />
        <ListItem pl="$0" icon={Pencil} onPress={onEdit} title="Edit" />
        <ListItem
          pl="$0"
          icon={Trash2}
          onPress={onDelete}
          title="Delete"
          color="$red10Light"
        />
      </YStack>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Delete book"
        description="Are you sure you want to delete this book?"
        isDelete
        onConfirm={deleteHandler}
      />
    </Sheet>
  );
};

export default BookDetailsOptionsSheet;
