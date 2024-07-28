import { create } from "zustand";

interface State {
  isAddBookSheetOpen: boolean;
  isFinishSessionSheetOpen: boolean;
}

interface Actions {
  setIsAddBookSheetOpen: (isOpen: boolean) => void;
  setIsFinishSessionSheetOpen: (isOpen: boolean) => void;
}

const useModalsStore = create<State & Actions>()((set) => ({
  isAddBookSheetOpen: false,
  setIsAddBookSheetOpen: (isOpen: boolean) =>
    set({ isAddBookSheetOpen: isOpen }),
  isFinishSessionSheetOpen: false,
  setIsFinishSessionSheetOpen: (isOpen: boolean) =>
    set({ isFinishSessionSheetOpen: isOpen }),
}));

export default useModalsStore;
