import { StoreFormData } from "@/features/officer/types";

export const BLANK_FORM_DATA: StoreFormData = {
  name: "",
  location: "",
  lastVisited: "",
};

export const ICON_BUTTON_CLASSES =
  "flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-all hover:bg-surface-container";

export const STORE_FILTER_OPTIONS = ["All Municipalities", "Virac", "San Andres", "Caramoran", "Pandan", "Bato"];
export const STATUS_CHIPS = ["Price Monitoring Week 3", "Wet Markets", "Supermarkets", "Recently Updated"];

export const INPUT_CLASSES =
  "w-full rounded-xl border border-outline bg-surface px-4 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
export const INPUT_ERROR_CLASSES = "border-error focus:border-error focus:ring-error/20";
export const PRIMARY_BUTTON_CLASSES =
  "rounded-xl bg-primary px-6 py-3 text-body-sm font-semibold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60";
