import { getCurrentUser } from "@/lib/auth";
import { SiteHeaderView } from "./SiteHeaderView";

export async function SiteHeader() {
  const user = await getCurrentUser();
  return <SiteHeaderView loggedIn={Boolean(user)} />;
}
