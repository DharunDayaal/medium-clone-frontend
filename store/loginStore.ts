import { create } from "zustand";

type PopupState = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const usePopupStore = create<PopupState>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value })
}))

export default usePopupStore;