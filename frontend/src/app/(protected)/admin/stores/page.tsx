import AppShell from "../../../../components/AppShell";
import StoreRegistryPage from "../../../../features/officer/StoreRegistryPage";

export default function AdminStoreRoute() {
  return (
    <AppShell activePath="/admin/stores">
      <StoreRegistryPage showAssignedOfficer />
    </AppShell>
  );
}
