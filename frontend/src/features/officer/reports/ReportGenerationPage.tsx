"use client";

import { useEffect, useMemo, useState } from "react";
import { MdDownload } from "react-icons/md";
import { reportTypes, exportFormats } from "./data";
import ExportFormatButton from "./components/ExportFormatButton";
import RecentReportCard from "./components/RecentReportCard";
import ReportTypeCard from "./components/ReportTypeCard";
import { createReport, getReports } from "./api";
import type { BackendReport, CreateReportPayload, RecentReport } from "./types";

const COMMODITY_GROUPS = [
  { value: "ALL", label: "All Commodities" },
  { value: "BASIC", label: "Basic Necessities" },
  { value: "PRIME", label: "Prime Commodities" },
  { value: "CONSTRUCTION", label: "Construction Materials" },
];

function mapBackendReportToRecent(report: BackendReport): RecentReport {
  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const typeTitle = reportTypes.find((type) => type.backendType === report.type)?.title ?? report.type.replace(/_/g, " ");

  return {
    id: report.id,
    name: `${typeTitle} · ${report.period}`,
    meta: formattedDate,
    status: "Ready",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed",
    statusIcon: MdDownload,
    buttonLabel: "Download",
    buttonIcon: MdDownload,
    buttonClass: "border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container",
    fileUrl: report.fileUrl,
  };
}

export default function ReportGenerationPage() {
  const defaultTypeId = reportTypes.find((type) => type.id === "daily-compliance")?.id ?? reportTypes[0].id;
  const defaultFormatLabel = exportFormats.find((format) => format.label === "Excel Spreadsheet")?.label ?? exportFormats[0].label;

  const [selectedReportTypeId, setSelectedReportTypeId] = useState(defaultTypeId);
  const [selectedExportFormat, setSelectedExportFormat] = useState(defaultFormatLabel);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [commodityGroup, setCommodityGroup] = useState(COMMODITY_GROUPS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);

  const selectedReportType = reportTypes.find((type) => type.id === selectedReportTypeId) ?? reportTypes[0];

  const selectedFormat = exportFormats.find((format) => format.label === selectedExportFormat) ?? exportFormats[0];

  const isGenerateDisabled = !startDate || !endDate;

  const period = useMemo(() => {
    if (!startDate || !endDate) {
      return "";
    }

    return `${startDate} to ${endDate}`;
  }, [startDate, endDate]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const response = await getReports();
        setRecentReports(response.data.map(mapBackendReportToRecent));
      } catch (err) {
        console.error("Unable to load reports", err);
      }
    };

    void loadReports();
  }, []);

  const handleGenerateReport = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!selectedReportType || !period) {
      setError("Select a report type and enter a valid date range.");
      return;
    }

    const format = selectedExportFormat === "Adobe PDF" ? "PDF" : "EXCEL";

    const payload: CreateReportPayload = {
      type: selectedReportType.backendType,
      period,
      format,
      commodityGroup: commodityGroup === "ALL" ? undefined : commodityGroup,
    };

    try {
      setLoading(true);
      const response = await createReport(payload);
      setSuccessMessage("Report generated successfully.");
      setRecentReports((current) => [mapBackendReportToRecent(response.data), ...current]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to generate report.");
    } finally {
      setLoading(false);
    }
  };

  const displayReports = recentReports.length > 0 ? recentReports : [];

  return (
    <main className="min-h-screen lg:ml-72">
      <section className="px-container-margin-mobile py-12 md:px-container-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <h2 className="mb-2 font-h1-desktop text-h1-desktop text-on-surface">Report Generation</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Configure and generate official market monitoring documentation.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <section className="flex flex-col gap-5 xl:col-span-8">
              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-caps font-semibold uppercase tracking-[0.24em] text-primary">
                      Step 1
                    </span>
                    <h3 className="mt-4 font-h3-desktop text-h3-desktop text-on-surface">Select Report Type</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {reportTypes.map((type) => (
                    <ReportTypeCard
                      key={type.id}
                      type={type}
                      isSelected={selectedReportTypeId === type.id}
                      onSelect={() => setSelectedReportTypeId(type.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-caps font-semibold uppercase tracking-[0.24em] text-primary">
                      Step 2
                    </span>
                    <h3 className="mt-4 font-h3-desktop text-h3-desktop text-on-surface">Configure Parameters</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2 min-w-0">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Date Range</label>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <input
                        className="flex-1 min-w-0 rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm"
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                      />
                      <span className="flex items-center justify-center rounded-xl border border-outline-variant bg-white px-4 text-body-sm font-semibold text-on-surface-variant">
                        to
                      </span>
                      <input
                        className="flex-1 min-w-0 rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm"
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-0">
                    <label className="font-label-caps text-label-caps text-on-surface-variant">Commodity Group</label>
                    <select
                      className="w-full rounded-xl border border-outline-variant bg-white p-3 font-body-sm text-body-sm"
                      value={commodityGroup}
                      onChange={(event) => setCommodityGroup(event.target.value)}
                    >
                      {COMMODITY_GROUPS.map((group) => (
                        <option key={group.value} value={group.value}>
                          {group.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {exportFormats.map((format) => (
                    <ExportFormatButton
                      key={format.label}
                      format={format}
                      isSelected={format.label === selectedExportFormat}
                      onSelect={() => setSelectedExportFormat(format.label)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateReport}
                disabled={loading || isGenerateDisabled}
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MdDownload size={18} />
                {loading ? "Generating report…" : "GENERATE OFFICIAL REPORT"}
              </button>

              {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}
              {successMessage ? <p className="mt-4 text-sm text-success">{successMessage}</p> : null}
            </section>

            <section className="flex flex-col gap-5 xl:col-span-4">
              <div className="rounded-3xl border border-outline-variant bg-white p-6 data-card-shadow md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">Recent Reports</p>
                    <h3 className="font-h3-desktop text-h3-desktop text-on-surface">Available exports</h3>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-outline-variant bg-white px-4 py-2 text-body-sm font-semibold text-primary transition hover:border-primary hover:bg-surface-container-lowest"
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                      setSelectedReportTypeId(defaultTypeId);
                      setSelectedExportFormat(defaultFormatLabel);
                      setCommodityGroup(COMMODITY_GROUPS[0].value);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="max-h-[520px] space-y-4 overflow-y-auto pr-1 scrollbar-none">
                  {displayReports.map((report) => (
                    <RecentReportCard
                      key={report.id}
                      report={report}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
