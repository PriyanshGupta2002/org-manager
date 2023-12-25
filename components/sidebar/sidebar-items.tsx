"use client";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface SidebarItemProps {
  name: string;
  link: string;
}
const SidebarItems: React.FC<SidebarItemProps> = ({ link, name }) => {
  const router = useRouter();
  const handleNavigation = useCallback(() => {
    router.push(link);
  }, [link, router]);
  const pathName = usePathname();
  if (!pathName) {
    return;
  }
  const isPathActive = pathName === link;

  return (
    <div
      onClick={handleNavigation}
      className={cn(
        "text-sm flex items-center gap-2 group text-zinc-500 cursor-pointer font-medium hover:bg-zinc-400/20 hover:underline p-3 transition rounded-md ease-linear duration-100 hover:text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-300/20 dark:hover:text-zinc-200",
        isPathActive &&
          "dark:bg-zinc-500/30 bg-zinc-800/10 text-zinc-700 dark:text-zinc-200"
      )}
    >
      {name}
      <ArrowRight className="w-4 h-4 ml-2 group-hover:-rotate-45 transition-all " />
    </div>
  );
};

export default SidebarItems;
