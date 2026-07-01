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
    statusClass: "bg-surface-container-highest text-on-surface-variant",
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
              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                    1
                  </span>
                  <h3 className="font-h3-desktop text-h3-desktop">Select Report Type</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {reportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.id}
                        className={`relative flex min-w-52.5 flex-1 cursor-pointer flex-col rounded-2xl border border-outline-variant bg-white p-6 transition-all data-card-shadow ${
                          type.active ? "border-primary" : "hover:border-primary"
                        }`}
                      >
                        <input readOnly checked={type.active} className="absolute right-4 top-4 text-primary" name="report_type" type="radio" />
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className={`rounded-xl p-2 ${type.iconBg}`}>
                            <Icon className={type.iconColor} size={24} />
                          </div>
                          {type.meta ? (
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${type.metaStyle}`}>
                              {type.meta}
                            </span>
                          ) : null}
                        </div>
                        <p className="mb-1 font-label-caps text-label-caps text-on-surface-variant">Report Type</p>
                        <h4 className={`text-[24px] font-bold leading-none ${type.active ? "text-primary" : "text-on-surface"}`}>
                          {type.title}
                        </h4>
                        <span className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                          {type.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                    2
                  </span>
                  <h3 className="font-h3-desktop text-h3-desktop">Configure Parameters</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Date Range</label>
                    <div className="flex gap-2">
                      <input className="flex-1 rounded-lg border border-outline-variant bg-surface p-3 font-body-sm text-body-sm" type="date" />
                      <span className="flex items-center font-bold text-on-surface-variant">to</span>
                      <input className="flex-1 rounded-lg border border-outline-variant bg-surface p-3 font-body-sm text-body-sm" type="date" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Commodity Group</label>
                    <select className="w-full rounded-lg border border-outline-variant bg-surface p-3 font-body-sm text-body-sm">
                      <option>All Commodities</option>
                      <option>Basic Necessities</option>
                      <option>Prime Commodities</option>
                      <option>Construction Materials</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                    3
                  </span>
                  <h3 className="font-h3-desktop text-h3-desktop">Export Format</h3>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  {exportFormats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.label}
                        className={`flex items-center gap-3 rounded-lg border px-6 py-3 transition-all ${
                          format.active
                            ? "border-primary bg-primary-container text-on-primary-container"
                            : "border-outline-variant hover:border-primary hover:bg-surface-container-low"
                        }`}
                      >
                        <Icon className={format.iconClass} size={20} />
                        <span className="font-body-sm text-body-sm font-semibold">{format.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-4 font-bold text-on-primary transition-opacity hover:opacity-90">
                  <MdDownload size={18} />
                  GENERATE OFFICIAL REPORT
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-5 xl:col-span-4">
              <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-highest p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant">Recent Reports</h3>
                  <button className="text-body-sm font-semibold text-primary hover:underline">View All</button>
                </div>

                <div className="flex flex-col gap-3">
                  {recentReports.map((report) => {
                    const StatusIcon = report.statusIcon;
                    const ButtonIcon = report.buttonIcon;
                    return (
                      <div key={report.name} className="flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[16px] font-h3-desktop leading-tight">{report.name}</p>
                            <p className="text-body-sm text-on-surface-variant">{report.meta}</p>
                          </div>
                          <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold ${report.statusClass}`}>
                            <StatusIcon size={14} />
                            {report.status}
                          </span>
                        </div>

                        <button
                          disabled={report.disabled}
                          className={`flex items-center justify-center gap-2 rounded-lg py-2 font-semibold text-body-sm transition-colors ${report.buttonClass}`}
                        >
                          <ButtonIcon size={18} />
                          {report.buttonLabel}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative h-48 overflow-hidden rounded-2xl border border-outline-variant">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzBXzwP-fyXhkYjAjcOF7jaW41b839OgUynqq-x_r6nbHSqQozC_nFPTUmjyRgm64L9OV8Ogz4DInno2xWjVqcxeRzSyKWTZaJ0bLb1z_rvRtApf_sfJDMOgRUhY8PBEp9-hDhJxfX_tCyznNM9wK_VA2Yl2HbihVjn5A4hG64jxvAkFvTbDq5AQIKp3W_VBIeoj2nGJNvIGyItrrlsPgitKnSTiKdvVDp7IfI16dmJPv-mTgIQdO_hQfQOVh-JqqRXliRe0SFydE"
                  alt="Modern analytics dashboard preview"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-h3-desktop font-bold text-white">Need custom analytics?</p>
                  <p className="text-body-sm text-white/80">Contact the IT department for specialized data queries.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
