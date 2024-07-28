import { create } from "zustand";

interface State {
  isAddBookSheetOpen: boolean;
  isAddNoteModalOpen: boolean;
  isFinishSessionSheetOpen: boolean;
  isEditDeleteSheetOpen: boolean;
}

interface Actions {
  setIsAddBookSheetOpen: (isOpen: boolean) => void;
  setIsAddNoteModalOpen: (isOpen: boolean) => void;
  setIsFinishSessionSheetOpen: (isOpen: boolean) => void;
  setIsEditDeleteSheetOpen: (isOpen: boolean) => void;
}

const useModalsStore = create<State & Actions>()((set) => ({
  isAddBookSheetOpen: false,
  setIsAddBookSheetOpen: (isOpen: boolean) =>
    set({ isAddBookSheetOpen: isOpen }),
  isAddNoteModalOpen: false,
  setIsAddNoteModalOpen: (isOpen: boolean) =>
    set({ isAddNoteModalOpen: isOpen }),
  isFinishSessionSheetOpen: false,
  setIsFinishSessionSheetOpen: (isOpen: boolean) =>
    set({ isFinishSessionSheetOpen: isOpen }),
  isEditDeleteSheetOpen: false,
  setIsEditDeleteSheetOpen: (isOpen: boolean) =>
    set({ isEditDeleteSheetOpen: isOpen }),
}));

export default useModalsStore;
