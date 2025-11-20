import type { Metadata } from "next";
import { RunLiftDashboardShell } from "@/components/dashboard/RunLiftDashboardShell";

export const metadata: Metadata = {
  title: "Run & Lift Dashboard",
};

export default function RunLiftDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:px-6">
        <RunLiftDashboardShell />
      </div>
    </main>
  );
}
