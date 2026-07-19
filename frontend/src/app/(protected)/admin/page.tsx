import AppShell from "../../../components/AppShell";
import AdminDashboardPage from "../../../features/admin/components/AdminDashboardPage";

export default function AdminRoute() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  console.log("API_BASE_URL: ", API_BASE_URL);
  return (
    <AppShell activePath="/admin">
      <AdminDashboardPage />
    </AppShell>
  );
}
