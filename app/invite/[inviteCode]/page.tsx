import { getCurrentProfile } from "@/lib/create-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface InvitePageProps {
  params: {
    inviteCode: string;
  };
}
const InviteCodePage: React.FC<InvitePageProps> = async ({ params }) => {
  const { inviteCode } = params;
  if (!inviteCode) {
    return redirect("/");
  }
  const profile = await getCurrentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const findOrg = await db.organization.findFirst({
    where: {
      inviteCode,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });
  if (!findOrg) {
    redirect("/");
  }
  const isMemberAlreadyInOrganization = findOrg.members.find(
    (member) => member.profileId === profile.id
  );
  console.log(isMemberAlreadyInOrganization);
  if (isMemberAlreadyInOrganization) {
    return redirect(`/view-organizations/${findOrg.id}`);
  }
  const org = await db.organization.update({
    where: {
      id: findOrg.id,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if (org) {
    redirect(`/view-organizations/${org.id}`);
  }

  return <div>InviteCodePahe</div>;
};

export default InviteCodePage;
