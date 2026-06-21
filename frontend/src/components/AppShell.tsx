import TopAppBar from "./TopAppBar";
import NavigationDrawer from "./NavigationDrawer";
import FooterSection from "./FooterSection";
import MobileBottomNav from "./MobileBottomNav";

export default function AppShell({
  children,
  activePath,
}: {
  children: React.ReactNode;
  activePath: string;
}) {
  return (
    <>
      <TopAppBar activePath={activePath} />
      <NavigationDrawer activePath={activePath} />
      {children}
      <FooterSection />
      <MobileBottomNav />
    </>
  );
}
