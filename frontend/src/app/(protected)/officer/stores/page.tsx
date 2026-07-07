import AppShell from "../../../../components/AppShell";
import StoreRegistryPage from "../../../../features/officer/StoreRegistryPage";

export default function OfficerStoreRoute() {
  return (
    <AppShell activePath="/officer/stores">
      <StoreRegistryPage />
    </AppShell>
  );
}
