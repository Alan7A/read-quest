import { create } from "zustand";

interface State {
  isAddBookModalOpen: boolean;
  isAddNoteModalOpen: boolean;
  isFinishSessionModalOpen: boolean;
}

interface Actions {
  setIsAddBookModalOpen: (isOpen: boolean) => void;
  setIsAddNoteModalOpen: (isOpen: boolean) => void;
  setIsFinishSessionModalOpen: (isOpen: boolean) => void;
}

const useModalsStore = create<State & Actions>()((set) => ({
  isAddBookModalOpen: false,
  setIsAddBookModalOpen: (isOpen: boolean) =>
    set({ isAddBookModalOpen: isOpen }),
  isAddNoteModalOpen: false,
  setIsAddNoteModalOpen: (isOpen: boolean) =>
    set({ isAddNoteModalOpen: isOpen }),
  isFinishSessionModalOpen: false,
  setIsFinishSessionModalOpen: (isOpen: boolean) =>
    set({ isFinishSessionModalOpen: isOpen }),
}));

export default useModalsStore;
