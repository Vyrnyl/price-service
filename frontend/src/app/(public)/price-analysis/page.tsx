import AppShell from "../../../components/AppShell";
import PriceAnalysisPage from "../../../components/PriceAnalysisPage";

export default function PriceAnalysisRoute() {
  return (
    <AppShell activePath="/price-analysis">
      <PriceAnalysisPage />
    </AppShell>
  );
}