import { create } from "zustand";

type addPropertyModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddPropertyModal = create<addPropertyModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
