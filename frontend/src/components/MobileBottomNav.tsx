import { MdAccountCircle, MdHome, MdNotifications, MdSearch } from "react-icons/md";

const navItems = [
  { icon: MdHome, label: "Home", active: true },
  { icon: MdSearch, label: "Search", active: false },
  { icon: MdNotifications, label: "Alerts", active: false },
  { icon: MdAccountCircle, label: "Profile", active: false },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-xl border-t border-outline-variant bg-surface px-4 py-2 shadow-lg lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center p-2 ${
              item.active
                ? "scale-90 rounded-xl bg-primary-container text-on-primary-container"
                : "text-on-surface-variant"
            }`}
          >
            <Icon />
            <span className="font-label-caps text-[10px]">{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
