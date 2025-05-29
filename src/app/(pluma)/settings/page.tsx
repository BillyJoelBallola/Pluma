import SettingSideBar from "./SettingSideBar";
import Profile from "@/app/(pluma)/settings/Profile";
import Account from "@/app/(pluma)/settings/Account";
import Appearance from "@/app/(pluma)/settings/Appearance";

export const metadata = {
  title: "Settings",
};

export default async function Settings({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const tab = params.tab ?? "profile";

  return (
    <div className="flex md:flex-row flex-col h-[calc(100dvh-4.5rem)]">
      <div className="p-4 w-full md:w-lg">
        <SettingSideBar tab={tab} />
      </div>
      <div className="p-4 w-full">
        {tab === "account" ? (
          <Account />
        ) : tab === "appearance" ? (
          <Appearance />
        ) : (
          <Profile />
        )}
      </div>
    </div>
  );
}
