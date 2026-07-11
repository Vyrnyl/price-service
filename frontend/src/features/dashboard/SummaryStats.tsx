import {
  MdOutlineCategory,
  MdOutlineStoreMallDirectory,
  MdOutlineUpdate,
} from "react-icons/md";

const stats = [
  {
    icon: MdOutlineCategory,
    label: "Total Commodities",
    value: "120",
    meta: "LATEST",
    iconClass: "text-primary",
  },
  {
    icon: MdOutlineStoreMallDirectory,
    label: "Stores Monitored",
    value: "65",
    meta: "+2 THIS WEEK",
    iconClass: "text-primary",
  },
  {
    icon: MdOutlineUpdate,
    label: "Price Updates Today",
    value: "38",
    meta: "LAST 24H",
    iconClass: "text-primary",
  },
];

export default function SummaryStats() {
  return (
    <section className="bg-surface-container-low px-container-margin-mobile py-12 md:px-container-margin-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
            Quick summary
          </h3>
          <p className="mt-1 font-body-sm text-on-surface-variant">
            A quick overview of the latest market activity and monitored coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="animate-stats rounded-2xl border border-outline-variant bg-white p-6 data-card-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-lg bg-primary/10 p-2 ${stat.iconClass}`}>
                    <Icon size={22} />
                  </span>
                  <span
                    className={`text-xs font-label-caps ${
                      stat.meta === "HIGH COMPLIANCE"
                        ? "text-[#00897B]"
                        : "text-outline"
                    }`}
                  >
                    {stat.meta}
                  </span>
                </div>
                <div className="mb-1 font-h1-desktop text-[32px] text-on-surface">
                  {stat.value}
                </div>
                <div className="font-label-caps text-label-caps text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
