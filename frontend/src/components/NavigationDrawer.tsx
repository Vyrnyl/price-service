import Link from "next/link";
import {
  MdOutlineDashboard,
  MdOutlineInventory2,
  MdOutlineSettings,
  MdOutlineTrendingUp,
} from "react-icons/md";

const navLinks = [
  { href: "/", icon: MdOutlineDashboard, label: "Market Dashboard" },
  { href: "/commodity-list", icon: MdOutlineInventory2, label: "Commodity List" },
  { href: "/price-analysis", icon: MdOutlineTrendingUp, label: "Price Analysis" },
  { href: "/settings", icon: MdOutlineSettings, label: "Settings" },
];

export default function NavigationDrawer({
  activePath,
}: {
  activePath: string;
}) {
  return (
    <aside className="fixed left-0 top-0 z-40 mt-20 hidden h-full w-72 flex-col rounded-r-xl bg-surface-container pt-8 shadow-lg lg:flex">
      <div className="mb-8 px-6">
        <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-outline">
          Navigation
        </h2>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-2 flex items-center gap-4 rounded-full px-6 py-3 transition-all ${
                isActive
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              <Icon />
              <span className="font-body-sm text-body-sm">{item.label}</span>
            </Link>
          );
        })}
        <hr className="mx-6 my-4 border-outline-variant" />
      </nav>
    </aside>
  );
}
