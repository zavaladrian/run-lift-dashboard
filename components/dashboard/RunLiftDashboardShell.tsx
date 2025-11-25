"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { RunningOverviewCard } from "./RunningOverviewCard";
import { RunListCard } from "./RunListCard";
import { StrengthOverviewCard } from "./StrengthOverviewCard";
import { TodayPlanCard } from "./TodayPlanCard";
import { StreaksCard } from "./StreaksCard";
import { PaceZonesCard } from "./PaceZonesCard";
import { MonthlySummaryCard } from "./MonthlySummaryCard";
import { SettingsCard } from "./SettingsCard";

type ViewFilter = "all" | "runs" | "strength";

export function RunLiftDashboardShell() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewFilter, setViewFilter] = useState<ViewFilter>("all");

  // Fake API delay
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  if (isLoading) {
    return (
      <>
        <SkeletonHeader />
        <SkeletonGrid />
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <ViewFilterBar view={viewFilter} onChange={setViewFilter} />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column (2/3 width) */}
        <div className="space-y-6 lg:col-span-2">
          {(viewFilter === "all" || viewFilter === "runs") && (
            <>
              <RunningOverviewCard />
              <RunListCard />
            </>
          )}

          {viewFilter === "strength" && (
            <>
              <StrengthOverviewCard />
            </>
          )}
        </div>

        {/* Right column (1/3 width) */}
        <div className="space-y-6 lg:col-span-1">
          {(viewFilter === "all" || viewFilter === "strength") && (
            <>
              <StrengthOverviewCard />
            </>
          )}

          {(viewFilter === "all" || viewFilter === "runs") && (
            <>
              <PaceZonesCard />
            </>
          )}

          {/* Always useful regardless of filter */}
          <MonthlySummaryCard />
          <TodayPlanCard />
          <StreaksCard />
          <SettingsCard />
        </div>
      </section>
    </>
  );
}

/* --------------------------- View Filter Bar --------------------------- */

type ViewFilterBarProps = {
  view: ViewFilter;
  onChange: (view: ViewFilter) => void;
};

function ViewFilterBar({ view, onChange }: ViewFilterBarProps) {
  return (
    <div className="mt-4 mb-2 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        Dashboard view
      </p>
      <div className="flex rounded-full bg-slate-900/70 p-1 text-xs">
        <FilterButton
          label="All"
          active={view === "all"}
          onClick={() => onChange("all")}
        />
        <FilterButton
          label="Runs"
          active={view === "runs"}
          onClick={() => onChange("runs")}
        />
        <FilterButton
          label="Strength"
          active={view === "strength"}
          onClick={() => onChange("strength")}
        />
      </div>
    </div>
  );
}

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 transition ${
        active
          ? "bg-emerald-500/20 text-emerald-300"
          : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

/* --------------------------- Skeletons --------------------------- */

function SkeletonHeader() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-56 rounded bg-slate-800" />
      <div className="mt-2 h-3 w-32 rounded bg-slate-900" />
      <div className="mt-4 flex gap-2">
        <div className="h-7 w-32 rounded-full bg-slate-900" />
        <div className="h-7 w-32 rounded-full bg-slate-900" />
        <div className="h-7 w-28 rounded-full bg-slate-900" />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="h-3 w-28 rounded bg-slate-800" />
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <div className="h-4 w-24 rounded bg-slate-900" />
        <div className="h-4 w-20 rounded bg-slate-900" />
        <div className="h-4 w-16 rounded bg-slate-900" />
        <div className="h-4 w-20 rounded bg-slate-900" />
      </div>
      <div className="mt-5 h-24 rounded-xl bg-slate-900" />
    </div>
  );
}

function SkeletonGrid() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left column */}
      <div className="space-y-6 lg:col-span-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Right column */}
      <div className="space-y-6 lg:col-span-1">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
}
