import { getCurrentProfile } from "@/lib/create-profile";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request) => {
  const profile = await getCurrentProfile();
  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { organizationEmail, organizationWebsite, name, description } =
    await req.json();
  if (!organizationEmail || !organizationWebsite || !name || !description) {
    return new NextResponse("Missing parameters", { status: 402 });
  }
  try {
    const organization = await db.organization.create({
      data: {
        name,
        organizationEmail,
        organizationWebsite,
        inviteCode: uuidv4(),
        ownerId: profile.id,
        description,
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    });

    return NextResponse.json(organization, { status: 200 });
  } catch (error) {
    console.log("[CREATE_ORGANIZATION]", error);
    return new NextResponse("Internal Server Error");
  }
};
