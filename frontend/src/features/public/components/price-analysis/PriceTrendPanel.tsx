"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

type PriceRange = "Week" | "Month";

export type TrendPoint = {
  date: string | null;
  price: number | null;
  label: string;
  x: number;
  y: number;
};

type PriceInsight = {
  title: string;
  price: string;
  change: string;
  confidence: string;
  path: string;
  labels: string[];
};

type PriceTrendPanelProps = {
  activeInsight: PriceInsight;
  activeRange: PriceRange;
  rangeOptions: readonly PriceRange[];
  points: TrendPoint[];
  selectedPointIndex: number | null;
  onRangeChange: (range: PriceRange) => void;
  onPointSelect: (index: number) => void;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function formatCurrency(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);
}

export function PriceTrendPanel({
  activeInsight,
  activeRange,
  rangeOptions,
  points,
  selectedPointIndex,
  onRangeChange,
  onPointSelect,
}: PriceTrendPanelProps) {
  const selectedPoint =
    selectedPointIndex != null && points[selectedPointIndex]
      ? points[selectedPointIndex]
      : points[points.length - 1] ?? null;

  const selectedDateLabel = selectedPoint?.date
    ? new Date(selectedPoint.date).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date available";

  const chartData = {
    labels: points.map((point) => {
      if (!point.date) {
        return point.label;
      }

      return new Date(point.date).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: activeInsight.title,
        data: points.map((point) => point.price),
        borderColor: "#004ac6",
        backgroundColor: "rgba(0, 74, 198, 0.16)",
        borderWidth: 3,
        tension: 0.35,
        pointRadius: points.map((_, index) => (selectedPointIndex === index ? 6 : 4)),
        pointHoverRadius: 6,
        pointBackgroundColor: points.map((_, index) => (selectedPointIndex === index ? "#e8f1ff" : "#ffffff")),
        pointBorderColor: "#004ac6",
        pointBorderWidth: points.map((_, index) => (selectedPointIndex === index ? 3 : 2)),
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number | null } }) =>
            formatCurrency(context.parsed.y),
        },
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "#6b7280",
          maxTicksLimit: 6,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    onClick: (_: unknown, elements: Array<{ index: number }>) => {
      if (elements[0]?.index != null) {
        onPointSelect(elements[0].index);
      }
    },
  };

  return (
    <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Price trend</p>
          <h3 className="mt-1 text-xl font-semibold text-on-surface">{activeInsight.title}</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            {activeInsight.change} • {activeInsight.confidence} confidence
          </p>
        </div>

        <div className="flex gap-2">
          {rangeOptions.map((range) => (
            <button
              key={range}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                activeRange === range
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              onClick={() => onRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container p-4">
        <div className="relative h-70">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="w-full border-t border-surface-variant/80" />
            ))}
          </div>

          <div className="relative h-full w-full">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="absolute left-[74%] top-4 z-10 rounded-2xl border border-outline-variant bg-surface-container-lowest p-3 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">Selected point</p>
            <p className="text-xl font-semibold text-on-surface">{selectedPoint ? formatCurrency(selectedPoint.price) : activeInsight.price}</p>
            <p className="text-sm text-success">{selectedDateLabel}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {activeInsight.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
