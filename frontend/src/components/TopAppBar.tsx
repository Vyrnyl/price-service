import Link from "next/link";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import RoleSwitcher from "./RoleSwitcher";

const navItems = [
  { label: "Public", href: "/public-user" },
  { label: "Admin", href: "/admin" },
  { label: "Monitoring", href: "/monitoring-officer" },
  { label: "Commodity List", href: "/commodity-list" },
  { label: "Price Analysis", href: "/price-analysis" },
];

export default function TopAppBar({
  activePath,
}: {
  activePath: string;
}) {
  const showLoginButton = activePath !== "/login";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-outline-variant bg-surface px-container-margin-mobile py-stack-md shadow-sm md:px-container-margin-desktop">
      <Link href="/" className="flex items-center gap-3">
        <MdOutlineAnalytics className="text-primary" size={28} />
        <h1 className="font-h2-desktop text-h2-desktop font-bold text-primary">
          PresyoSerbisyo
        </h1>
      </Link>
      {/* <div className="hidden gap-8 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-label-caps text-label-caps rounded px-2 py-1 transition-colors ${
              activePath === item.href
                ? "border-b-2 border-primary text-primary"
                : "text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div> */}
      <div className="flex items-center gap-3">
        {/* <RoleSwitcher /> */}
        {/* <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low">
          <FaSearch />
        </button> */}
        {showLoginButton ? (
          <Link href="/login">
            <button className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-caps text-label-caps text-on-primary transition-opacity hover:opacity-90 md:flex">
              <LuLogIn fontSize={12} />
              LOGIN
            </button>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
