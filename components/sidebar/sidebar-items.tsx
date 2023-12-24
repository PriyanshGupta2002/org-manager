import { ArrowRight } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  name: string;
  link: string;
}
const SidebarItems: React.FC<SidebarItemProps> = ({ link, name }) => {
  return (
    <div className="text-sm flex items-center gap-2 group text-zinc-500 cursor-pointer font-medium hover:bg-zinc-400/20 p-3 transition rounded-md ease-linear duration-100 hover:text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-300/20 dark:hover:text-zinc-200">
      {name}
      <ArrowRight className="w-4 h-4 ml-2 group-hover:-rotate-45 transition-all " />
    </div>
  );
};

export default SidebarItems;
