import AppShell from "@/components/AppShell";
import PriceRecordsPage from "@/features/officer/PriceRecordsPage";

export default function OfficerPriceRecordsRoute() {
  return (
    <AppShell activePath="/officer/price-records">
      <PriceRecordsPage />
    </AppShell>
  );
}
