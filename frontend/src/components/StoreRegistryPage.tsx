import { IoMdArrowForward } from "react-icons/io";
import {
  MdAddBusiness,
  MdCalendarToday,
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdHourglassEmpty,
  MdLocationOn,
  MdOutlineStorefront,
  MdReport,
  MdSearch,
  MdStore,
  MdWarning,
} from "react-icons/md";

const stores = [
  {
    name: "Virac Plaza Supermarket",
    tin: "123-456-789-000",
    location: "Poblacion, Virac, Catanduanes",
    lastVisit: "Oct 24, 2024",
    officer: "R. Santos",
    status: "Monitored",
    statusTone: "border border-green-200 bg-green-50 text-green-700",
    statusIcon: MdCheckCircle,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    footerLabel: "Officer: R. Santos",
    footerAction: "Details",
    icon: MdStore,
  },
  {
    name: "L&M General Merchandising",
    tin: "987-654-321-005",
    location: "Codon, San Andres, Catanduanes",
    lastVisit: "Oct 22, 2024",
    officer: "R. Santos",
    status: "Violation",
    statusTone: "bg-error text-on-error",
    statusIcon: MdWarning,
    iconBg: "bg-error-container",
    iconColor: "text-error",
    footerLabel: "SRP Deviation Detected",
    footerAction: "Action",
    icon: MdReport,
  },
  {
    name: "Pandan Agri-Hub",
    tin: "456-123-789-012",
    location: "Libjo, Pandan, Catanduanes",
    lastVisit: "Sept 15, 2024",
    officer: "R. Santos",
    status: "Pending",
    statusTone:
      "border border-secondary-fixed bg-secondary-fixed/20 text-on-secondary-container",
    statusIcon: MdHourglassEmpty,
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-container",
    footerLabel: "Renewal Overdue",
    footerAction: "Schedule",
    icon: MdOutlineStorefront,
  },
  {
    name: "Catanduanes Food Mart",
    tin: "234-567-890-001",
    location: "San Roque, Virac, Catanduanes",
    lastVisit: "Oct 25, 2024",
    officer: "M. Cruz",
    status: "Monitored",
    statusTone: "border border-green-200 bg-green-50 text-green-700",
    statusIcon: MdCheckCircle,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    footerLabel: "Officer: M. Cruz",
    footerAction: "Details",
    icon: MdStore,
  },
];

export default function StoreRegistryPage() {
  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <MdOutlineStorefront size={20} />
                <span className="font-label-caps text-label-caps text-outline">
                  Registry Management
                </span>
              </div>
              <h1 className="font-h1-desktop text-h1-desktop text-on-surface mobile:font-h1-mobile mobile:text-h1-mobile">
                Establishment Registry
              </h1>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Manage and monitor registered retail outlets across Catanduanes.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md">
              <MdAddBusiness size={18} />
              <span>Add New Outlet</span>
            </button>
          </div>

          <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
              <div className="relative md:col-span-6">
                <MdSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  size={20}
                />
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low py-3 pl-12 pr-4 text-body-sm placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary"
                  placeholder="Search store name, TIN, or owner..."
                  type="text"
                />
              </div>

              <div className="md:col-span-3">
                <select className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-body-sm focus:ring-2 focus:ring-primary">
                  <option value="">All Municipalities</option>
                  <option>Virac</option>
                  <option>San Andres</option>
                  <option>Caramoran</option>
                  <option>Pandan</option>
                  <option>Bato</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <select className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-body-sm focus:ring-2 focus:ring-primary">
                  <option value="">All Statuses</option>
                  <option>Monitored</option>
                  <option>Pending</option>
                  <option>Violation</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2">
              <span className="mr-2 whitespace-nowrap font-label-caps text-label-caps text-on-surface-variant">
                Quick Filter:
              </span>
              {[
                "Price Monitoring Week 3",
                "Wet Markets",
                "Supermarkets",
                "Recently Updated",
              ].map((chip) => (
                <button
                  key={chip}
                  className="whitespace-nowrap rounded-full border border-outline-variant px-4 py-1.5 text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-fr">
            {stores.map((store) => {
              const Icon = store.icon;
              const StatusIcon = store.statusIcon;

              return (
                <div
                  key={store.name}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${store.iconBg}`}
                      >
                        <Icon className={store.iconColor} size={24} />
                      </div>

                      <div
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${store.statusTone}`}
                      >
                        <StatusIcon size={14} />
                        {store.status}
                      </div>
                    </div>

                    <h3 className="mb-1 truncate font-h3-desktop text-h3-desktop text-on-surface">
                      {store.name}
                    </h3>

                    <p className="mb-4 text-body-sm text-on-surface-variant">
                      TIN: {store.tin}
                    </p>

                    <div className="mt-auto space-y-3 border-t border-outline-variant pt-4">
                      <div className="flex items-center gap-3 text-on-surface-variant">
                        <MdLocationOn size={18} />
                        <span className="text-body-sm">{store.location}</span>
                      </div>

                      <div className="flex items-center gap-3 text-on-surface-variant">
                        <MdCalendarToday size={18} />
                        <span className="text-body-sm">
                          Last Visit: {store.lastVisit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-surface-container-low px-6 py-3">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      {store.footerLabel}
                    </span>

                    <button className="flex items-center gap-1 font-body-sm font-semibold text-primary transition-colors hover:underline">
                      {store.footerAction}
                      <IoMdArrowForward />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant py-6 md:flex-row">
            <span className="font-body-sm text-on-surface-variant">
              Showing 1 to 10 of 42 stores
            </span>
            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-all hover:bg-surface-container">
                <MdChevronLeft size={20} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-on-primary shadow-sm">
                1
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-all hover:bg-surface-container">
                2
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-all hover:bg-surface-container">
                3
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-all hover:bg-surface-container">
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
