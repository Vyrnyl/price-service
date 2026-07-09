import TopAppBar from "./TopAppBar";
import NavigationDrawer from "./NavigationDrawer";
import FooterSection from "./FooterSection";
import MobileBottomNav from "./MobileBottomNav";

export default function AppShell({
  children,
  activePath,
  hideNavigation,
}: {
  children: React.ReactNode;
  activePath: string;
  hideNavigation?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopAppBar activePath={activePath} />
      {!hideNavigation && <NavigationDrawer activePath={activePath} />}
      <main className="flex-1">{children}</main>
      <FooterSection />
      <MobileBottomNav />
    </div>
  );
}
