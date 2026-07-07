import {
  MdCheckCircle,
  MdInfoOutline,
  MdOpenInNew,
  MdRemove,
  MdTrendingUp,
  MdWarningAmber,
} from "react-icons/md";

const commodities = [
  {
    title: "Well-milled Rice",
    unit: "Per Kilogram",
    badge: "SRP COMPLIANT",
    badgeIcon: MdCheckCircle,
    badgeClass: "bg-[#E8F5E9] text-[#2E7D32]",
    price: "₱45.00",
    srp: "SRP: ₱48.00",
    change: "+₱2.00",
    trend: "v. last week",
    trendIcon: MdTrendingUp,
    trendClass: "text-error",
    image:
      "/images.webp",
  },
  {
    title: "Refined Sugar",
    unit: "Per Kilogram",
    badge: "SRP VIOLATION",
    badgeIcon: MdWarningAmber,
    badgeClass: "bg-error-container text-error",
    price: "₱95.00",
    srp: "SRP: ₱85.00",
    change: "+₱10.00",
    trend: "v. last week",
    trendIcon: MdTrendingUp,
    trendClass: "text-error",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCs5F7kb4kJpvXKKpaq3fciXBMrvgTHLtIEhgNl4grlw04arTacS1qv05BSY2jh8j3ALcDCXtemBZk3hOivZ51DUH1Of1oAfytXw00k65_1Y0D3B3hAYsySjVZXUXtNRp8HrcXmggEE1YkG9wWu6KmSytXd6rqsDAWJATchGKTcLBmVh-IFUyGfZbOPm5MaQDRBmCWJw4-EWccNu_Dq3IVdbUjq67aVNGq-q3aFCoDd5JXMCN1LP5xpGU6eIMSBOA4O4pvcPqxSI-c",
  },
  {
    title: "Canned Sardines",
    unit: "155g Tin Can",
    badge: "STABLE",
    badgeIcon: MdInfoOutline,
    badgeClass: "bg-surface-container-highest text-on-surface-variant",
    price: "₱22.50",
    srp: "SRP: ₱23.00",
    change: "₱0.00",
    trend: "no change",
    trendIcon: MdRemove,
    trendClass: "text-[#00897B]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCT0bfAKmT8WHB5tNZjVlxQfF8v9oBJdygtHBjPHul9GNJsKfiUqy8q1W8Uvso_kor4Vj17IbH3X6HYJrxxWgbH8yzFS4julq0gbVjFQByNS72pG0GPigICo1YFWQ-Tz_P7wCcX_TOMcVCZ5rdaisrflHnc6nvO01EGLMeznfYA8lVO-gTJn3P1g_5qYy9BgaBN7nw26izifxDY-bTuRqGSNfAPPnSX-ZWFzdv4-hIIi0lBx-dzb5TNYMEglHfRZimAVQgKIHqZTOI",
  },
];

export default function TopCommoditiesGrid() {
  return (
    <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-h2-desktop text-h2-desktop">Top Monitored Commodities</h3>
          <a className="flex items-center gap-1 font-label-caps text-label-caps text-primary hover:underline" href="#">
            View All
            <MdOpenInNew size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {commodities.map((item) => {
            const BadgeIcon = item.badgeIcon;
            const TrendIcon = item.trendIcon;
            return (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-outline-variant bg-white transition-all hover:shadow-xl"
              >
                <div className="relative h-32 overflow-hidden bg-surface-container-highest">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                  />
                  <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-primary backdrop-blur">
                    STAPLE
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-h3-desktop text-h3-desktop">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant">{item.unit}</p>
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${item.badgeClass}`}>
                      <BadgeIcon size={12} />
                      {item.badge}
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-price-display text-price-display text-on-surface">{item.price}</div>
                      <div className="text-[11px] text-outline">{item.srp}</div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center justify-end gap-1 text-xs font-bold ${item.trendClass}`}>
                        {item.change}
                        <TrendIcon size={14} />
                      </div>
                      <div className="text-[11px] text-outline">{item.trend}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
