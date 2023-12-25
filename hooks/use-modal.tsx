import { Organization, Project } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "create-project";
interface ModalDataType {
  project?: Project;
  organization?: Organization;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (type: ModalType | null, data?: ModalDataType | {}) => void; // Changed the type of data to 'any'
  type: ModalType | null;
  data?: ModalDataType | {}; // Changed the type of data to 'any'
}

const useModal = create<ModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: (type, data = {}) =>
    set({
      isOpen: true,
      data,
      type,
    }),
  type: null,
  data: {},
}));

export default useModal;
