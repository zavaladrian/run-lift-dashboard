"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { RunningOverviewCard } from "./RunningOverviewCard";
import { RunListCard } from "./RunListCard";
import { StrengthOverviewCard } from "./StrengthOverviewCard";
import { TodayPlanCard } from "./TodayPlanCard";
import { StreaksCard } from "./StreaksCard";
import { PaceZonesCard } from "./PaceZonesCard";

export function RunLiftDashboardShell() {
  const [isLoading, setIsLoading] = useState(true);

  // Fake API delay
  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2s fake load
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

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column (2/3 width) */}
        <div className="space-y-6 lg:col-span-2">
          <RunningOverviewCard />
          <RunListCard />
        </div>

        {/* Right column (1/3 width) */}
        <div className="space-y-6 lg:col-span-1">
          <StrengthOverviewCard />
          <PaceZonesCard />
          <TodayPlanCard />
          <StreaksCard />
        </div>
      </section>
    </>
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
