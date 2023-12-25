import ProjectButton from "@/components/project/project-button";
import { Button } from "@/components/ui/button";
import { getCurrentProfile } from "@/lib/create-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const OrganizationDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const profile = await getCurrentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.id) {
    redirect("/");
  }
  const organization = await db.organization.findUnique({
    where: {
      id: params.id,
    },
    include: {
      projects: true,
      members: {
        include: {
          profile: true,
        },
      },
    },
  });
  if (!organization) {
    return redirect("/");
  }
  const isOwnerOfCurrentOrganization = organization.ownerId === profile.id;
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {isOwnerOfCurrentOrganization && <ProjectButton />}
      </div>
    </div>
  );
};

export default OrganizationDetailPage;
