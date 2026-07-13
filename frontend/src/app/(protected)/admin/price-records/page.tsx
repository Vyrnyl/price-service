import AppShell from "../../../../components/AppShell";
import PriceRecordsPage from "@/features/officer/PriceRecordsPage";

export default function AdminPriceRecordsRoute() {
  return (
    <AppShell activePath="/admin/price-records">
      <PriceRecordsPage canCreateRecord={false} hideActions />
    </AppShell>
  );
}
