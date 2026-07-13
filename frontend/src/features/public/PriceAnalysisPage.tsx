"use client";

import { useEffect, useState } from "react";
import {
  MdBarChart,
  MdMonetizationOn,
  MdTrendingUp,
  MdVerified,
} from "react-icons/md";
import { getPublicCommodities } from "../commodity/api/commodity.api";
import { DailyChangesPanel } from "./components/price-analysis/DailyChangesPanel";
import { ForecastDetailModal } from "./components/price-analysis/ForecastDetailModal";
import { ForecastMethodPanel } from "./components/price-analysis/ForecastMethodPanel";
import { ForecastSummaryPanel } from "./components/price-analysis/ForecastSummaryPanel";
import { PriceAnalysisHeader } from "./components/price-analysis/PriceAnalysisHeader";
import { PriceAnalysisSummaryCards } from "./components/price-analysis/PriceAnalysisSummaryCards";
import { PriceTrendPanel } from "./components/price-analysis/PriceTrendPanel";

const rangeOptions = ["1M", "6M", "1Y"] as const;

type RangeKey = (typeof rangeOptions)[number];

const rangeInsightMap: Record<
  RangeKey,
  {
    title: string;
    price: string;
    change: string;
    confidence: string;
    projection: string;
    path: string;
    labels: string[];
  }
> = {
  "1M": {
    title: "Last 30 Days",
    price: "₱56.20",
    change: "+0.8% vs previous cycle",
    confidence: "High",
    projection: "Slight upward pressure from transport costs",
    path: "M 0,260 L 120,245 L 240,250 L 360,220 L 480,205 L 600,195 L 760,170 L 920,155 L 1000,140",
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  },
  "6M": {
    title: "Last 6 Months",
    price: "₱55.00",
    change: "+3.2% vs the same period last year",
    confidence: "High",
    projection: "Seasonal demand is lifting rates gradually",
    path: "M 0,300 L 120,290 L 240,270 L 360,240 L 480,225 L 600,205 L 760,180 L 920,155 L 1000,140",
    labels: ["MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
  },
  "1Y": {
    title: "Last 12 Months",
    price: "₱53.80",
    change: "+7.4% across the year",
    confidence: "Medium",
    projection: "Longer-term stability with seasonal spikes",
    path: "M 0,280 L 120,272 L 240,260 L 360,245 L 480,220 L 600,205 L 760,185 L 920,160 L 1000,140",
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
  },
};

const summaryCards = [
  {
    title: "Current price",
    value: "₱55.00",
    detail: "As of today",
    icon: MdMonetizationOn,
    accent: "text-primary",
  },
  {
    title: "SRP benchmark",
    value: "₱54.00",
    detail: "Within policy range",
    icon: MdVerified,
    accent: "text-success",
  },
  {
    title: "Forecasted next month",
    value: "₱57.00",
    detail: "Projected increase",
    icon: MdTrendingUp,
    accent: "text-error",
  },
  {
    title: "Compliance status",
    value: "Compliant",
    detail: "Stable market watch",
    icon: MdBarChart,
    accent: "text-primary",
  },
];

const dailyChanges = [
  { label: "Today", value: "+₱1.00", note: "From yesterday's average" },
  { label: "This week", value: "+₱2.50", note: "Compared with last week" },
  { label: "30-day trend", value: "+₱3.20", note: "Across the latest month" },
];

export default function PriceAnalysisPage() {
  const [activeRange, setActiveRange] = useState<RangeKey>("6M");
  const [commodityOptions, setCommodityOptions] = useState<string[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [isCommodityOpen, setIsCommodityOpen] = useState(false);
  const [commoditySearch, setCommoditySearch] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const activeInsight = rangeInsightMap[activeRange];

  useEffect(() => {
    let isMounted = true;

    const loadCommodities = async () => {
      try {
        const commodities = await getPublicCommodities();
        const fetchedCommodityNames = Array.from(
          new Set(
            commodities
              .map((commodity) => commodity.name?.trim())
              .filter((name): name is string => Boolean(name)),
          ),
        );

        if (!isMounted) return;

        setCommodityOptions(fetchedCommodityNames);
        setSelectedCommodity((current) => {
          if (current && fetchedCommodityNames.includes(current)) {
            return current;
          }
          return fetchedCommodityNames[0] ?? "";
        });
      } catch (error) {
        console.error("Unable to load commodities", error);
      }
    };

    void loadCommodities();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCommodities = commodityOptions.filter((option) =>
    option.toLowerCase().includes(commoditySearch.trim().toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-surface-container-low lg:ml-72">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-container-margin-mobile py-8 md:px-container-margin-desktop md:py-10">
        <PriceAnalysisHeader
          selectedCommodity={selectedCommodity}
          isCommodityOpen={isCommodityOpen}
          commoditySearch={commoditySearch}
          filteredCommodities={filteredCommodities}
          onToggleCommodity={() => {
            setIsCommodityOpen((value) => !value);
            setCommoditySearch("");
          }}
          onCommoditySearchChange={setCommoditySearch}
          onSelectCommodity={(option) => {
            setSelectedCommodity(option);
            setIsCommodityOpen(false);
            setCommoditySearch("");
          }}
        />

        <PriceAnalysisSummaryCards cards={summaryCards} />

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
          <PriceTrendPanel
            activeInsight={activeInsight}
            activeRange={activeRange}
            rangeOptions={rangeOptions}
            onRangeChange={setActiveRange}
          />

          <ForecastSummaryPanel
            activeInsight={activeInsight}
            onOpenDetail={() => setShowDetailModal(true)}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <DailyChangesPanel changes={dailyChanges} />
          <ForecastMethodPanel />
        </div>
      </section>

      {showDetailModal ? (
        <ForecastDetailModal
          selectedCommodity={selectedCommodity}
          onClose={() => setShowDetailModal(false)}
        />
      ) : null}
    </main>
  );
}
