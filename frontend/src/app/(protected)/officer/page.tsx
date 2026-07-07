import AppShell from "@/components/AppShell";
import MonitoringOfficerDashboardPage from "@/features/officer/MonitoringOfficerDashboardPage";

export default function MonitoringOfficerRoute() {
  return (
    <AppShell activePath="/officer">
      <MonitoringOfficerDashboardPage />
    </AppShell>
  );
}
