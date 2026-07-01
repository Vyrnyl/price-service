import AppShell from "../../../../components/AppShell";
import StoreRegistryPage from "../../../../components/StoreRegistryPage";

export default function OfficerStoreRoute() {
  return (
    <AppShell activePath="/officer/stores">
      <StoreRegistryPage />
    </AppShell>
  );
}
