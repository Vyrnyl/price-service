import AppShell from "../../../components/AppShell";
import PriceAnalysisPage from "../../../features/public/PriceAnalysisPage";

export default function PriceAnalysisRoute() {
  return (
    <AppShell activePath="/price-analysis">
      <PriceAnalysisPage />
    </AppShell>
  );
}