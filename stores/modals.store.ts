import { create } from "zustand";

interface State {
  isAddBookModalOpen: boolean;
}

interface Actions {
  setIsAddBookModalOpen: (isOpen: boolean) => void;
}

const useModalsStore = create<State & Actions>()((set) => ({
  isAddBookModalOpen: false,
  setIsAddBookModalOpen: (isOpen: boolean) =>
    set({ isAddBookModalOpen: isOpen }),
}));

export default useModalsStore;
