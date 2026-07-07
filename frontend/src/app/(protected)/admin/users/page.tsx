import AppShell from "../../../../components/AppShell";
import UsersManagementPage from "../../../../features/admin/users/components/UsersManagementPage";

export default function AdminUsersRoute() {
  return (
    <AppShell activePath="/admin/users">
      <UsersManagementPage />
    </AppShell>
  );
}
