"use client";

import { useEffect, useState } from "react";
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
  const [isCompactScreen, setIsCompactScreen] = useState(false);

  useEffect(() => {
    const updateCompactScreen = () => {
      setIsCompactScreen(window.innerWidth < 640);
    };

    updateCompactScreen();
    window.addEventListener("resize", updateCompactScreen);

    return () => window.removeEventListener("resize", updateCompactScreen);
  }, []);

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
        borderColor: "#2563eb",
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return "rgba(37, 99, 235, 0.14)";
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.28)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0.04)");
          return gradient;
        },
        borderWidth: 3,
        tension: 0.35,
        pointRadius: points.map((_, index) => (selectedPointIndex === index ? 6 : 4)),
        pointHoverRadius: 6,
        pointBackgroundColor: points.map((_, index) => (selectedPointIndex === index ? "#eff6ff" : "#ffffff")),
        pointBorderColor: "#2563eb",
        pointBorderWidth: points.map((_, index) => (selectedPointIndex === index ? 3 : 2)),
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isCompactScreen ? 220 : 420,
      easing: "easeOutCubic" as const,
    },
    layout: {
      padding: {
        top: 8,
        right: isCompactScreen ? 4 : 8,
        bottom: 0,
        left: isCompactScreen ? 4 : 8,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#374151",
        borderColor: "#dbeafe",
        borderWidth: 1,
        padding: 10,
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
          maxTicksLimit: isCompactScreen ? 4 : 6,
          autoSkip: true,
          autoSkipPadding: 10,
          font: {
            size: isCompactScreen ? 10 : 11,
          },
        },
        grid: {
          display: false,
        },
        border: {
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
    <section className="rounded-3xl border border-outline-variant/80 bg-linear-to-br from-surface-container-lowest to-surface-container p-4 shadow-[0_14px_40px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Price trend</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-on-surface">{activeInsight.title}</h3>
          <p className="mt-1 text-sm text-on-surface-variant">
            {activeInsight.change} • {activeInsight.confidence} confidence
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {rangeOptions.map((range) => (
            <button
              key={range}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                activeRange === range
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
              onClick={() => onRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] border border-outline-variant/70 bg-surface-container p-3 shadow-inner sm:p-4">
        <div className="relative h-60 sm:h-70 md:h-80 lg:h-90">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="w-full border-t border-surface-variant/80" />
            ))}
          </div>

          <div className="relative h-full w-full">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="mt-3 w-full rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-3 shadow-sm sm:absolute sm:inset-x-3 sm:bottom-3 sm:mt-0 sm:w-auto sm:max-w-56 sm:shadow-md md:left-[60%] md:right-auto md:top-4 md:bottom-auto md:max-w-60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">Selected point</p>
            <p className="text-lg font-semibold text-on-surface sm:text-xl">{selectedPoint ? formatCurrency(selectedPoint.price) : activeInsight.price}</p>
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
