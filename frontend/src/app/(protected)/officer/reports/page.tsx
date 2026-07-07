import AppShell from "../../../../components/AppShell";
import ReportGenerationPage from "../../../../features/officer/ReportGenerationPage";

export default function OfficerReportsRoute() {
  return (
    <AppShell activePath="/officer/reports">
      <ReportGenerationPage />
    </AppShell>
  );
}
