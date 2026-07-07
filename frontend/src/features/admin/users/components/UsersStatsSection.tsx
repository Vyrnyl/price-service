"use client";

import type { IconType } from "react-icons";

type StatsItem = {
  label: string;
  value: string;
  trend: string;
  icon: IconType;
  accent: string;
  trendTone: string;
};

type UsersStatsSectionProps = {
  stats: StatsItem[];
};

export default function UsersStatsSection({ stats }: UsersStatsSectionProps) {
  return (
    <section className="flex flex-wrap gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex min-w-0 flex-1 flex-col rounded-xl border border-outline-variant bg-surface-container-lowest p-6 data-card-shadow"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className={`rounded-xl p-2 ${stat.accent}`}>
                <Icon size={20} />
              </span>
              <span className="text-label-caps uppercase text-outline">{stat.label}</span>
            </div>
            <p className="mb-1 text-label-caps text-on-surface-variant">{stat.label}</p>
            <h3 className="text-h2-desktop text-on-surface">{stat.value}</h3>
            <div className={`mt-2 flex items-center gap-1 text-body-sm ${stat.trendTone}`}>
              <Icon size={12} />
              <span>{stat.trend}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
