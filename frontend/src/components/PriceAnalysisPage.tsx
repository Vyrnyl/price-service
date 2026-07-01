import {
  MdAutoAwesome,
  MdBolt,
  MdInfo,
  MdSchedule,
  MdTrendingUp,
  MdVerified,
} from "react-icons/md";

export default function PriceAnalysisPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-h1-desktop text-h1-desktop text-on-surface">
              Advanced Market Analytics
            </h2>
            <p className="font-body-sm text-on-surface-variant">
              Comprehensive price tracking and AI-driven forecasting for essential
              commodities.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-2">
            <span className="px-2 font-label-caps text-label-caps text-outline">
              SELECT COMMODITY:
            </span>
            <select className="border-none bg-transparent text-body-sm font-semibold text-primary focus:ring-0">
              <option>Rice (Well-milled)</option>
              <option>Sugar (Refined)</option>
              <option>Pork (Liempo)</option>
              <option>Chicken (Whole)</option>
            </select>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
                  6-Month Price Trend
                </h3>
                <div className="mt-2 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary"></span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Actual Price
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-0.5 w-3 border-t-2 border-dashed border-outline-variant"></span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Suggested Retail Price (SRP)
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden gap-2 md:flex">
                {['1M', '6M', '1Y'].map((range, index) => (
                  <button
                    key={range}
                    className={`rounded-full px-4 py-2 font-label-caps text-label-caps transition-all ${
                      index === 1
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-high hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] border-b border-l border-outline-variant">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div key={line} className="w-full border-t border-surface-variant" />
                ))}
              </div>

              <svg className="h-full w-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <path
                  d="M 0,250 L 200,250 L 400,250 L 600,280 L 800,280 L 1000,280"
                  fill="none"
                  opacity="0.5"
                  stroke="#737686"
                  strokeDasharray="8 4"
                  strokeWidth="2"
                />
                <path
                  className="chart-path-animate"
                  d="M 0,300 L 100,280 L 200,290 L 300,220 L 400,240 L 500,210 L 600,230 L 700,190 L 800,150 L 900,170 L 1000,140"
                  fill="none"
                  stroke="#004ac6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <circle cx="200" cy="290" r="4" fill="#004ac6" />
                <circle cx="400" cy="240" r="4" fill="#004ac6" />
                <circle cx="600" cy="230" r="4" fill="#004ac6" />
                <circle cx="800" cy="150" r="6" fill="#004ac6" stroke="white" strokeWidth="2" />
              </svg>

              <div className="absolute left-[78%] top-[80px] z-10 hidden rounded-lg bg-inverse-surface p-4 text-inverse-on-surface shadow-lg md:block">
                <p className="text-[10px] font-label-caps opacity-70">AUG 24, 2024</p>
                <p className="font-price-display text-price-display">₱55.00</p>
                <p className="font-body-sm text-green-400">+2.5% vs Prev</p>
              </div>

              <div className="absolute -bottom-8 flex w-full justify-between px-4 font-label-caps text-label-caps text-on-surface-variant">
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <MdBolt className="text-secondary" size={24} />
            <h3 className="font-h3-desktop text-h3-desktop text-on-surface">
              Future Price Forecast
              <span className="ml-2 text-body-sm font-normal text-on-surface-variant">
                Powered by ARIMA
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              {
                label: "CURRENT PRICE",
                value: "₱55",
                note: "As of Today",
                icon: MdSchedule,
                cardClass: "bg-surface-container-lowest border border-outline-variant",
                valueClass: "text-on-surface",
                noteClass: "text-on-surface-variant",
              },
              {
                label: "PREDICTED NEXT MONTH",
                value: "₱57",
                note: "AI Projection",
                icon: MdAutoAwesome,
                cardClass: "bg-primary-container text-on-primary-container",
                valueClass: "text-on-primary-container",
                noteClass: "opacity-90",
              },
              {
                label: "EXPECTED CHANGE",
                value: "+3.6%",
                note: "Rising Trend",
                icon: MdTrendingUp,
                cardClass: "bg-surface-container-lowest border border-outline-variant",
                valueClass: "text-error",
                noteClass: "text-on-surface-variant",
              },
              {
                label: "CONFIDENCE",
                value: "95%",
                note: "High Reliability",
                icon: MdVerified,
                cardClass: "bg-surface-container-lowest border border-outline-variant",
                valueClass: "text-on-surface",
                noteClass: "text-on-surface-variant",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-w-48 flex-1 flex-col rounded-2xl border border-outline-variant bg-white p-4 shadow-sm data-card-shadow"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className={`rounded-xl p-2 ${item.cardClass.includes("bg-primary-container") ? "bg-primary/10" : "bg-surface-container-high"}`}>
                      <Icon className={item.cardClass.includes("bg-primary-container") ? "text-primary" : "text-on-surface-variant"} size={20} />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-outline">
                      Today
                    </span>
                  </div>
                  <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">
                    {item.label}
                  </p>
                  <h3 className="text-[28px] font-bold leading-none text-on-surface">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="mt-1 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="relative h-[250px]">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 1000 200">
                <path d="M 700,50 L 1000,20 L 1000,80 L 700,50" fill="#2563eb" fillOpacity="0.1" />
                <path
                  d="M 0,150 L 100,140 L 200,160 L 300,120 L 400,110 L 500,90 L 600,100 L 700,50"
                  fill="none"
                  stroke="#004ac6"
                  strokeWidth="3"
                />
                <path
                  d="M 700,50 L 800,40 L 900,45 L 1000,30"
                  fill="none"
                  stroke="#004ac6"
                  strokeDasharray="6 4"
                  strokeWidth="3"
                />
                <circle cx="700" cy="50" r="5" fill="#004ac6" />
                <text x="700" y="30" fill="#004ac6" fontFamily="Inter" fontSize="12" fontWeight="bold">
                  NOW
                </text>
              </svg>

              <div className="absolute bottom-0 flex w-full justify-between px-2 font-label-caps text-label-caps text-on-surface-variant">
                <span>Past 3 Months</span>
                <span className="font-bold text-primary">Projection (Next 30 Days)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 rounded-lg border-l-4 border-primary bg-surface-container p-4">
            <MdInfo className="text-primary" size={20} />
            <p className="font-body-sm italic text-on-surface-variant">
              Disclaimer: This forecast is intended to support consumer awareness
              and does not represent a government mandate on future pricing.
              Actual market outcomes may vary due to external economic factors,
              logistics, and climate events.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative h-64 overflow-hidden rounded-xl md:col-span-2">
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrBNUDu3T76nNZ--_ylU7VV9dmYdGN63ovfqzQ-VahXH7f66pv4Aw42WYjto4wEgv0G_PyMkJTvjo_N30Ot9ZSS30kFWHvQOu8AVGfgl0UNtm5o8UglrPTqJjoWsogz2J7RuIN3D2JWJhNUWmaW5V8d4UrQwlBRCYLj-KusAU6Y2-A1oFcVI9DT5pZAz8a9j04fvr66ar-JDh76JxDNWXMDF3UhZVlfhAsudk8NxfuaZiCJ_t2_5hVso5cGoYdyopNBSsmXeoFRLE"
              alt="Analyst reviewing market data"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <h4 className="font-h3-desktop text-h3-desktop text-white">
                Market Drivers Analysis
              </h4>
              <p className="font-body-sm text-white/80">
                Global supply chain pressures are stabilizing, though local harvest cycles remain a key variable for Rice pricing in Q4.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl bg-surface-container-highest p-6">
            <div>
              <h4 className="mb-4 font-h3-desktop text-h3-desktop text-on-surface">
                Expert Commentary
              </h4>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary">
                  DC
                </div>
                <div>
                  <p className="font-label-caps text-label-caps">DR. CATHERINE REYES</p>
                  <p className="font-body-sm text-on-surface-variant">Senior Economist</p>
                </div>
              </div>
              <p className="font-body-sm italic text-on-surface">
                “The 3.6% projected increase is seasonally expected but remains well within the historical SRP variance.”
              </p>
            </div>

            <button className="mt-4 w-full rounded-lg bg-on-surface px-4 py-2 font-label-caps text-label-caps text-surface transition-opacity hover:opacity-90">
              READ FULL REPORT
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
