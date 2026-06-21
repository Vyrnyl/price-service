import HeroSection from "./HeroSection";
import SummaryStats from "./SummaryStats";
import FeaturedSection from "./FeaturedSection";
import TopCommoditiesGrid from "./TopCommoditiesGrid";

export default function DashboardPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <HeroSection />
      <SummaryStats />
      <FeaturedSection />
      <TopCommoditiesGrid />
    </main>
  );
}
