import AppShell from "../../../components/AppShell";
import AdminDashboardPage from "../../../features/admin/components/AdminDashboardPage";

export default function AdminRoute() {
  return (
    <AppShell activePath="/admin">
      <AdminDashboardPage />
    </AppShell>
  );
}
