import AppShell from "@/components/AppShell";
import CommodityManagementPage from "@/features/commodity/CommodityManagementPage";

export default function OfficerCommoditiesRoute() {
  return (
    <AppShell activePath="/officer/commodities">
      <CommodityManagementPage userRole="officer" />
    </AppShell>
  );
}
