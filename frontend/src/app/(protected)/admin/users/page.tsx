import AppShell from "../../../../components/AppShell";
import UsersManagementPage from "../../../../components/UsersManagementPage";

export default function AdminUsersRoute() {
  return (
    <AppShell activePath="/admin/users">
      <UsersManagementPage />
    </AppShell>
  );
}
