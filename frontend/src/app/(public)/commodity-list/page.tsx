import AppShell from "../../../components/AppShell";
import CommodityListPage from "../../../features/commodity/CommodityListPage";

export default function CommodityListRoute() {
  return (
    <AppShell activePath="/commodity-list">
      <CommodityListPage />
    </AppShell>
  );
}