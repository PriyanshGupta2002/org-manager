"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "../components/modals/create-project-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return <CreateProjectModal />;
};

export default ModalProvider;
