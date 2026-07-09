import AppShell from "@/components/AppShell";
import CommodityManagementPage from "@/features/commodity/CommodityManagementPage";

export default function AdminCommoditiesRoute() {
  return (
    <AppShell activePath="/admin/commodities">
      <CommodityManagementPage userRole="admin" />
    </AppShell>
  );
}
