import AppShell from "@/components/AppShell";
import CommodityManagementPage from "@/components/CommodityManagementPage";

export default function AdminRoute() {
  return (
    <AppShell activePath="/admin/commodities">
      <CommodityManagementPage />
    </AppShell>
  );
}
