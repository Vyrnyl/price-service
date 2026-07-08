import type { IconType } from "react-icons";
import { IoMdArrowForward } from "react-icons/io";
import { MdCalendarToday, MdCheckCircle, MdHourglassEmpty, MdLocationOn, MdStore } from "react-icons/md";
import { Store } from "@/features/officer/types";

function getStoreStatus(store: Store): { label: string; tone: string; icon: IconType } {
  if (!store.lastVisited) {
    return {
      label: "Pending",
      tone: "border border-secondary-fixed bg-secondary-fixed/20 text-on-secondary-container",
      icon: MdHourglassEmpty,
    };
  }

  const lastVisitedDate = new Date(store.lastVisited);
  const ageInDays = Math.floor((Date.now() - lastVisitedDate.getTime()) / 86400000);

  return ageInDays > 30
    ? {
        label: "Pending",
        tone: "border border-secondary-fixed bg-secondary-fixed/20 text-on-secondary-container",
        icon: MdHourglassEmpty,
      }
    : {
        label: "Monitored",
        tone: "border border-green-200 bg-green-50 text-green-700",
        icon: MdCheckCircle,
      };
}

export function StoreCard({ store, showAssignedOfficer }: { store: Store; showAssignedOfficer: boolean }) {
  const status = getStoreStatus(store);
  const StatusIcon = status.icon;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-fixed text-primary">
            <MdStore size={24} />
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${status.tone}`}>
            <StatusIcon size={14} />
            {status.label}
          </div>
        </div>

        <h3 className="mb-1 truncate font-h3-desktop text-h3-desktop text-on-surface">{store.name}</h3>

        <div className="mt-auto space-y-3 border-t border-outline-variant pt-4">
          <div className="flex items-center gap-3 text-on-surface-variant">
            <MdLocationOn size={18} />
            <span className="text-body-sm">{store.location}</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <MdCalendarToday size={18} />
            <span className="text-body-sm">
              Last visit: {store.lastVisited ? new Date(store.lastVisited).toLocaleDateString() : "No visits yet"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-surface-container-low px-6 py-3">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          {showAssignedOfficer ? `Assigned Officer: ${store.user?.name ?? "Unassigned"}` : store.lastVisited ? "Last visit recorded" : "No visit data"}
        </span>
        <button className="flex items-center gap-1 font-body-sm font-semibold text-primary transition-colors hover:underline">
          Details
          <IoMdArrowForward />
        </button>
      </div>
    </div>
  );
}
