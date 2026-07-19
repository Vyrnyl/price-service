import PriceRecordsPage from "@/features/officer/PriceRecordsPage";

export default function AdminPriceRecordsRoute() {
  return <PriceRecordsPage canCreateRecord={false} hideActions />;
}
