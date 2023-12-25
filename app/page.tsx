import { getCurrentProfile } from "@/lib/create-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return redirectToSignIn();
  }
  return redirect("/create-organization");
};

export default Home;
