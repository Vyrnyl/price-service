import AppShell from "@/components/AppShell";
import MonitoringOfficerDashboardPage from "@/components/MonitoringOfficerDashboardPage";

export default function MonitoringOfficerRoute() {
  return (
    <AppShell activePath="/monitoring-officer">
      <MonitoringOfficerDashboardPage />
    </AppShell>
  );
}
