import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import db from "./db";

export const getCurrentProfile = async () => {
  const currentProfile = await currentUser();
  if (!currentProfile) {
    return null;
  }
  const doesUserExist = await db.user.findUnique({
    where: {
      userId: currentProfile.id,
    },
  });
  if (doesUserExist) {
    return doesUserExist;
  }
  const user = await db.user.create({
    data: {
      email: currentProfile.emailAddresses[0].emailAddress,
      imageUrl: currentProfile.imageUrl,
      name: `${currentProfile.firstName} ${currentProfile.lastName}`,
      userId: currentProfile.id,
    },
  });
  return user;
};
