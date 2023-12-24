import { getCurrentProfile } from "@/lib/create-profile";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

const Home = async () => {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return redirectToSignIn();
  }

  return <div></div>;
};

export default Home;
