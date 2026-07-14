type DailyChange = {
  label: string;
  value: string;
  note: string;
};

type DailyChangesPanelProps = {
  changes: DailyChange[];
};

export function DailyChangesPanel({ changes }: DailyChangesPanelProps) {
  return (
    <section className="rounded-3xl border border-outline-variant/80 bg-gradient-to-br from-surface-container-lowest to-surface-container p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Daily price changes</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-on-surface">Recent movement in the commodity price</h3>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {changes.map((change) => (
          <div key={change.label} className="rounded-2xl border border-outline-variant/70 bg-surface-container-high p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-on-surface">{change.label}</span>
              <span className="font-semibold text-primary">{change.value}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">{change.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
