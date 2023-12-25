import OrganizationCard from "@/components/organization/organization-card";
import OrganizationHeader from "@/components/organization/organization-header";
import { getCurrentProfile } from "@/lib/create-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import React from "react";

const OrganizationsPage = async () => {
  const profile = await getCurrentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const allOrganizations = await db.organization.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-9">
        <OrganizationHeader title={"All Active Organizations"} />

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allOrganizations.map((org) => (
            <OrganizationCard
              key={org.id}
              description={org.description}
              name={org.name}
              email={org.organizationEmail}
              website={org.organizationWebsite}
              inviteCode={org.inviteCode}
              totalMembers={org.members.length}
              isOwner={org.ownerId === profile.id}
              orgId={org.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
