"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useModal from "@/hooks/use-modal";

const CreateProjectModal = () => {
  const { isOpen, onClose, type } = useModal();
  const open = isOpen && type === "create-project";
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-center">
            Create Project
          </DialogTitle>
          <DialogDescription className="text-sm dark:text-zinc-300 text-zinc-600 text-center">
            Create Project for the organization
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">form goes here</div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
