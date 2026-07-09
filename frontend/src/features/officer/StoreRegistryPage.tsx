"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MdAddBusiness, MdOutlineStorefront, MdSearch, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { apiFetch } from "@/lib/api";
import {
  Store,
  StoreFormData,
  StoreRegistryPageProps,
} from "@/features/officer/types";
import {
  ICON_BUTTON_CLASSES,
  STORE_FILTER_OPTIONS,
  STATUS_CHIPS,
  BLANK_FORM_DATA,
} from "./constants";
import { CreateStoreDialog } from "@/features/officer/components/CreateStoreDialog";
import { StoreCard } from "@/features/officer/components/StoreCard";


export default function StoreRegistryPage({ showAssignedOfficer = true, canCreateStore = true }: StoreRegistryPageProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<StoreFormData>(BLANK_FORM_DATA);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof StoreFormData, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function loadStores() {
      try {
        const response = await apiFetch<{ status: string; data: Store[] }>("/api/stores");
        setStores(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load stores");
      } finally {
        setIsLoading(false);
      }
    }

    loadStores();
  }, []);

  const handleFormChange = (field: keyof StoreFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof StoreFormData, string>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Store name is required.";
    }
    if (!formData.location.trim()) {
      nextErrors.location = "Location is required.";
    }

    return nextErrors;
  };

  const handleCreateStore = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors({});
    setSubmitLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        lastVisited: formData.lastVisited ? new Date(formData.lastVisited).toISOString() : null,
      };

      const response = await apiFetch<{ status: string; data: Store }>("/api/stores", {
        method: "POST",
        body: payload,
      });

      setStores((current) => [response.data, ...current]);
      setFormSuccess("Store created successfully.");
      setFormData(BLANK_FORM_DATA);
      setFormOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to create store.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <MdOutlineStorefront size={20} />
                <span className="font-label-caps text-label-caps text-outline">Registry Management</span>
              </div>
              <h1 className="font-h1-desktop text-h1-desktop text-on-surface mobile:font-h1-mobile mobile:text-h1-mobile">
                Establishment Registry
              </h1>
              <p className="mt-1 font-body-lg text-on-surface-variant">
                Manage and monitor registered retail outlets across Catanduanes.
              </p>
            </div>
            {canCreateStore && (
              <button type="button" onClick={() => setFormOpen((current) => !current)} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body-sm font-semibold text-on-primary shadow-sm transition-all hover:shadow-md">
                <MdAddBusiness size={18} />
                <span>{formOpen ? "Close Add Outlet" : "Add New Outlet"}</span>
              </button>
            )}
          </div>

          {canCreateStore && formOpen && (
            <CreateStoreDialog
              formData={formData}
              formErrors={formErrors}
              formError={formError}
              formSuccess={formSuccess}
              submitLoading={submitLoading}
              onClose={() => setFormOpen(false)}
              onChange={handleFormChange}
              onSubmit={handleCreateStore}
            />
          )}

          <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
              <div className="relative md:col-span-6">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low py-3 pl-12 pr-4 text-body-sm placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary"
                  placeholder="Search store name, ID, or owner..."
                  type="text"
                />
              </div>

              <div className="md:col-span-3">
                <select className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-body-sm focus:ring-2 focus:ring-primary">
                  {STORE_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option === "All Municipalities" ? "" : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-body-sm focus:ring-2 focus:ring-primary">
                  <option value="">All Statuses</option>
                  <option>Monitored</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2">
              <span className="mr-2 whitespace-nowrap font-label-caps text-label-caps text-on-surface-variant">Quick Filter:</span>
              {STATUS_CHIPS.map((chip) => (
                <button key={chip} className="whitespace-nowrap rounded-full border border-outline-variant px-4 py-1.5 text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container">
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-outline-variant bg-white p-8 text-center text-body-md text-on-surface-variant">Loading stores...</div>
          ) : error ? (
            <div className="rounded-2xl border border-error bg-error-container p-8 text-center text-body-md text-on-error">{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 auto-rows-fr">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} showAssignedOfficer={showAssignedOfficer} />
              ))}
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant py-6 md:flex-row">
            <span className="font-body-sm text-on-surface-variant">
              Showing {stores.length} store{stores.length === 1 ? "" : "s"}
            </span>
            <div className="flex gap-2">
              <button className={ICON_BUTTON_CLASSES}>
                <MdChevronLeft size={20} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-on-primary shadow-sm">1</button>
              <button className={ICON_BUTTON_CLASSES}>2</button>
              <button className={ICON_BUTTON_CLASSES}>3</button>
              <button className={ICON_BUTTON_CLASSES}>
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
