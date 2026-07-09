import {
  MdCheckCircle,
  MdDownload,
  MdFactCheck,
  MdHourglassEmpty,
  MdPictureAsPdf,
  MdStorefront,
  MdSync,
  MdTableView,
  MdWarning,
} from "react-icons/md";

const reportTypes = [
  {
    id: "daily-compliance",
    title: "Daily Compliance",
    description: "Status of SRP compliance per retailer.",
    icon: MdFactCheck,
    active: true,
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary",
    meta: "Selected",
    metaStyle: "bg-primary/5 text-primary",
  },
  {
    id: "store-monitoring",
    title: "Store Monitoring",
    description: "Aggregated store performance summary.",
    icon: MdStorefront,
    iconBg: "bg-secondary-container/10",
    iconColor: "text-secondary",
  },
  {
    id: "srp-violation-log",
    title: "SRP Violation Log",
    description: "List of critical price violations found.",
    icon: MdWarning,
    iconBg: "bg-error-container/20",
    iconColor: "text-error",
  },
];

const exportFormats = [
  {
    label: "Adobe PDF",
    icon: MdPictureAsPdf,
    iconClass: "text-error",
    active: false,
  },
  {
    label: "Excel Spreadsheet",
    icon: MdTableView,
    iconClass: "",
    active: true,
  },
  {
    label: "CSV Data",
    icon: MdDownload,
    iconClass: "text-on-tertiary-fixed-variant",
    active: false,
  },
];

const recentReports = [
  {
    name: "Daily_Compliance_2024-05-15",
    meta: "May 15, 2024 • 2.4 MB",
    status: "Ready",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
    statusIcon: MdCheckCircle,
    buttonLabel: "Download PDF",
    buttonIcon: MdDownload,
    buttonClass:
      "border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container",
  },
  {
    name: "Price_Trend_Weekly_Q2",
    meta: "Generating now...",
    status: "Processing",
    statusClass: "bg-surface-container-lowest text-on-surface-variant",
    statusIcon: MdSync,
    buttonLabel: "Please Wait",
    buttonIcon: MdHourglassEmpty,
    buttonClass: "border border-outline-variant text-outline cursor-not-allowed",
    disabled: true,
  },
  {
    name: "Store_Log_Virac_Center",
    meta: "May 14, 2024 • 12 KB",
    status: "Ready",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
    statusIcon: MdCheckCircle,
    buttonLabel: "Download Excel",
    buttonIcon: MdDownload,
    buttonClass:
      "border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container",
  },
];

export default function ReportGenerationPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <h2 className="mb-2 font-h1-desktop text-h1-desktop text-on-surface">
              Report Generation
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Configure and generate official market monitoring documentation.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <section className="flex flex-col gap-5 xl:col-span-8">
              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
                      Step 1
                    </span>
                    <h3 className="mt-4 font-h3-desktop text-h3-desktop text-on-surface">Select Report Type</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {reportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.id}
                        className={`relative flex min-w-0 cursor-pointer flex-col rounded-3xl border border-outline-variant bg-white p-6 transition-all duration-200 hover:border-primary ${
                          type.active ? "border-primary shadow-sm" : ""
                        }`}
                      >
                        <input readOnly checked={type.active} className="absolute right-4 top-4 text-primary" name="report_type" type="radio" />
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className={`rounded-xl p-2 ${type.iconBg}`}>
                            <Icon className={type.iconColor} size={24} />
                          </div>
                          {type.meta ? (
                            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${type.metaStyle}`}>
                              {type.meta}
                            </span>
                          ) : null}
                        </div>
                        <p className="mb-2 font-label-caps text-label-caps text-on-surface-variant">Report Type</p>
                        <h4 className={`text-[22px] font-semibold leading-tight ${type.active ? "text-primary" : "text-on-surface"}`}>
                          {type.title}
                        </h4>
                        <span className="mt-3 text-body-sm text-on-surface-variant">
                          {type.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
                      Step 2
                    </span>
                    <h3 className="mt-4 font-h3-desktop text-h3-desktop text-on-surface">Configure Parameters</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Date Range</label>
                    <div className="flex flex-col gap-2 md:flex-row">
                      <input className="flex-1 rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm" type="date" />
                      <span className="flex items-center justify-center rounded-xl border border-outline-variant bg-white px-4 text-body-sm font-semibold text-on-surface-variant">
                        to
                      </span>
                      <input className="flex-1 rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm" type="date" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Commodity Group</label>
                    <select className="w-full rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm">
                      <option>All Commodities</option>
                      <option>Basic Necessities</option>
                      <option>Prime Commodities</option>
                      <option>Construction Materials</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
                      Step 3
                    </span>
                    <h3 className="mt-4 font-h3-desktop text-h3-desktop text-on-surface">Export Format</h3>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  {exportFormats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.label}
                        className={`flex items-center gap-3 rounded-2xl border px-6 py-3 transition-all duration-200 ${
                          format.active
                            ? "border-primary bg-primary-container text-on-primary-container"
                            : "border-outline-variant bg-white hover:border-primary"
                        }`}
                      >
                        <Icon className={format.iconClass} size={20} />
                        <span className="text-body-sm font-semibold">{format.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-on-primary transition hover:opacity-90">
                  <MdDownload size={18} />
                  GENERATE OFFICIAL REPORT
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-5 xl:col-span-4">
              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">Recent Reports</p>
                    <h3 className="font-h3-desktop text-h3-desktop text-on-surface">Available exports</h3>
                  </div>
                  <button className="rounded-full border border-outline-variant bg-white px-4 py-2 text-body-sm font-semibold text-primary transition hover:border-primary hover:bg-surface-container-lowest">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentReports.map((report) => {
                    const StatusIcon = report.statusIcon;
                    const ButtonIcon = report.buttonIcon;
                    return (
                      <div key={report.name} className="rounded-3xl border border-outline-variant bg-white p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <p className="truncate text-lg font-semibold text-on-surface">{report.name}</p>
                            <p className="mt-1 text-body-sm text-on-surface-variant">{report.meta}</p>
                          </div>
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold ${report.statusClass}`}>
                            <StatusIcon size={14} />
                            {report.status}
                          </span>
                        </div>

                        <button
                          disabled={report.disabled}
                          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-semibold transition-colors ${report.buttonClass}`}
                        >
                          <ButtonIcon size={18} />
                          {report.buttonLabel}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
