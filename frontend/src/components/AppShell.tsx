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
    <>
      <TopAppBar activePath={activePath} />
      {!hideNavigation && <NavigationDrawer activePath={activePath} />}
      {children}
      <FooterSection />
      <MobileBottomNav />
    </>
  );
}
