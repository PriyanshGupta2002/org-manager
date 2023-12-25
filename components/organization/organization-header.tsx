import { BadgePlus, Building } from "lucide-react";
import React from "react";

interface OrganizationHeaderProps {
  title: String;
}
const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({ title }) => {
  return (
    <div className="relative rounded-lg capitalize  p-3 mt-6 bg-zinc-200 dark:bg-black m-auto group ">
      <div className="absolute -z-20 -inset-0.5 rounded-lg blur  dark:bg-pink-600 opacity-65 group-hover:opacity-90 transition-all" />
      <div className=" flex items-center justify-center text-base font-bold gap-3">
        {title}
        <Building className="w-5 h-5 text-rose-500" />
      </div>
    </div>
  );
};

export default OrganizationHeader;
