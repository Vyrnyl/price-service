import type { ComponentType } from "react";

type SummaryCard = {
  title: string;
  value: string;
  detail: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  accent: string;
};

type PriceAnalysisSummaryCardsProps = {
  cards: SummaryCard[];
};

export function PriceAnalysisSummaryCards({ cards }: PriceAnalysisSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-outline">
                {card.title}
              </span>
              <div className={`rounded-xl bg-surface-container-high p-2 ${card.accent}`}>
                <Icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-semibold text-on-surface">{card.value}</p>
            <p className="mt-1 text-sm text-on-surface-variant">{card.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
