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
    <section className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-outline">Daily price changes</p>
          <h3 className="mt-1 text-xl font-semibold text-on-surface">Recent movement in the commodity price</h3>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {changes.map((change) => (
          <div key={change.label} className="rounded-2xl border border-outline-variant bg-surface-container-high p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-on-surface">{change.label}</span>
              <span className="font-semibold text-primary">{change.value}</span>
            </div>
            <p className="mt-2 text-sm text-on-surface-variant">{change.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
