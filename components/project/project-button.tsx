"use client";
import React from "react";
import { Button } from "../ui/button";
import useModal from "@/hooks/use-modal";
import { PlusIcon } from "lucide-react";

const ProjectButton = () => {
  const { onOpen } = useModal();
  return (
    <Button
      size={"sm"}
      className="w-fit dark:text-zinc-200 text-zinc-100 font-medium dark:bg-zinc-300/25 dark:hover:bg-zinc-300/20"
      onClick={() => onOpen("create-project")}
    >
      Create Project <PlusIcon className="w-5 h-5 ml-2" />
    </Button>
  );
};

export default ProjectButton;
