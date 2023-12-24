import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarLinks } from "@/lib/constants";
import SidebarItems from "./sidebar-items";
import { Building, UserRound } from "lucide-react";
import { getCurrentProfile } from "@/lib/create-profile";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";

const Sidebar = async () => {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <ScrollArea className="h-[500px] w-full space-y-5">
        {sidebarLinks.map((item) => (
          <div key={item.groupName} className="space-y-2">
            <div className="text-xs flex items-center gap-1 uppercase text-zinc-400 dark:text-zinc-300">
              {item.groupName}
              <span>
                <Building className="text-neutral-600 h-4 w-4 dark:text-zinc-300" />
              </span>
            </div>
            <div className="flex flex-col gap-1 p-2">
              {item.links.map((inLink) => (
                <SidebarItems
                  name={inLink.name}
                  key={inLink.link}
                  link={inLink.link}
                />
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col gap-2 p-2">
        <div className="text-xs flex items-center gap-1 uppercase text-zinc-400 dark:text-zinc-300">
          Profile
          <UserRound className="text-neutral-600 h-4 w-4 dark:text-zinc-300" />
        </div>
        <div className="p-2 flex items-center gap-1 mt-auto text-zinc-500 cursor-pointer font-medium hover:bg-zinc-400/20 transition-all rounded-md hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-200 dark:hover:bg-zinc-300/20 ">
          <div className="flex items-center gap-1">
            <p className="text-sm">{currentProfile.name}</p>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-[30px] w-[30px]",
                },
              }}
            />
          </div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
