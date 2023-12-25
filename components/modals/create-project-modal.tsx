"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useModal from "@/hooks/use-modal";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be atleast 2 characters long",
  }),
});

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
        <div className="p-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
