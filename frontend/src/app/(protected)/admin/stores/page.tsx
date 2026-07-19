import StoreRegistryPage from "../../../../features/officer/StoreRegistryPage";

export default function AdminStoreRoute() {
  return <StoreRegistryPage showAssignedOfficer canCreateStore={false} />;
}
