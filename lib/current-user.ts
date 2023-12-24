import { auth } from "@clerk/nextjs";
export const getCurrentUser = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return userId;
};
