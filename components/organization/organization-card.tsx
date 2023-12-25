"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, AtSign, Globe, Link } from "lucide-react";
import { Button } from "../ui/button";
import ActionToolTip from "../action-tooltip";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";
interface OrganizationCardProps {
  name: string;
  description: string;
  email: string;
  totalMembers: number;
  website: string;
  inviteCode: string;
  isOwner: boolean;
  orgId: string;
}
const OrganizationCard: React.FC<OrganizationCardProps> = ({
  name,
  description,
  email,
  totalMembers,
  website,
  inviteCode,
  isOwner,
  orgId,
}) => {
  const origin = useOrigin();
  const inviteCodeUrl = `${origin}/invite/${inviteCode}`;
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCodeUrl);
    toast({
      title: "Invite link copied!",
    });
  };
  const router = useRouter();

  return (
    <Card className="p-4 flex flex-col gap-2">
      <CardHeader className="text-sm capitalize  text-zinc-500 p-0 dark:text-zinc-200">
        {name}
      </CardHeader>
      <CardDescription className="text-sm">{description}</CardDescription>
      <CardContent className="p-0 flex flex-col gap-2">
        <p className="text-xs text-zinc-500 dark:text-zinc-200">
          Total Members - {totalMembers}
        </p>
        <div className="flex items-center gap-3">
          <span className="p-1 dark:hover:bg-zinc-400/30 rounded-full cursor-pointer hover:bg-zinc-200/20 transition-all opacity-40 hover:opacity-100 group">
            <ActionToolTip label="Email">
              <a
                href={`mailto:${email}`}
                target="__blank"
                rel="noopener noreferrer"
              >
                {" "}
                <AtSign className="w-4 h-4 text-zinc-400 dark:text-zinc-200 group-hover:text-indigo-500" />
              </a>
            </ActionToolTip>
          </span>
          <span
            className="p-1 dark:hover:bg-zinc-400/30 rounded-full cursor-pointer hover:bg-zinc-200/20 transition-all opacity-40 hover:opacity-100 group"
            onClick={copyToClipboard}
          >
            <ActionToolTip label="Invite Code">
              <Link className="w-4 h-4 text-zinc-400 dark:text-zinc-200 group-hover:text-indigo-500" />
            </ActionToolTip>
          </span>
          <span className="p-1 dark:hover:bg-zinc-400/30 rounded-full cursor-pointer hover:bg-zinc-200/20 transition-all opacity-40 hover:opacity-100 group">
            <ActionToolTip label="Website">
              <a href={website} target="__blank" rel="noopener noreferrer">
                {" "}
                <Globe className="w-4 h-4 text-zinc-400 dark:text-zinc-200 group-hover:text-indigo-500" />
              </a>
            </ActionToolTip>
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-auto">
        <Button
          className="w-full"
          onClick={() => router.push(`/view-organizations/${orgId}`)}
        >
          Visit <ArrowRight className="w-4 h-4 " />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
