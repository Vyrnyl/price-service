import AppShell from "@/components/AppShell";
import CommodityManagementPage from "@/components/CommodityManagementPage";

export default function OfficerCommoditiesRoute() {
  return (
    <AppShell activePath="/officer/commodities">
      <CommodityManagementPage />
    </AppShell>
  );
}
