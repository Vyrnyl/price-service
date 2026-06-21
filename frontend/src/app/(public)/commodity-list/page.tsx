import AppShell from "../../../components/AppShell";
import CommodityListPage from "../../../components/CommodityListPage";

export default function CommodityListRoute() {
  return (
    <AppShell activePath="/commodity-list">
      <CommodityListPage />
    </AppShell>
  );
}