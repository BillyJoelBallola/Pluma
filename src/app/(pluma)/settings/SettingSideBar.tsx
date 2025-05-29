import Link from "next/link";

const settingSideBar = [
  {
    label: "Profile",
    href: "/settings?tab=profile",
  },
  {
    label: "Account",
    href: "/settings?tab=account",
  },
  {
    label: "Appearance",
    href: "/settings?tab=appearance",
  },
];

export default function SettingSideBar({ tab }: { tab: string }) {
  return (
    <div className="flex gap-2 md:gap-0 md:flex-col">
      {settingSideBar.map((setting) => {
        const activeTab = tab === setting.label.toLowerCase();

        return (
          <Link
            key={setting.label}
            href={setting.href}
            className={`hover:underline rounded-md p-2 font-semibold ${
              activeTab ? "bg-gray-200 dark:bg-gray-800" : null
            }`}
          >
            {setting.label}
          </Link>
        );
      })}
    </div>
  );
}
