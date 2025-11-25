"use client";

import { useState } from "react";
import { Card, CardHeader } from "./ui";

export function SettingsCard() {
  const [showPaceZones, setShowPaceZones] = useState(true);
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [emailSummary, setEmailSummary] = useState(false);

  return (
    <Card delay={0.3}>
      <CardHeader
        title="Dashboard Settings"
        subtitle="Fake controls to demo UI states"
      />

      <div className="space-y-3 text-sm">
        <ToggleRow
          label="Show pace zones card"
          description="Controls whether the pace donut is visible (conceptually)."
          checked={showPaceZones}
          onChange={setShowPaceZones}
        />

        <ToggleRow
          label="Show loading skeletons"
          description="Simulates a real API latency before the dashboard loads."
          checked={showSkeletons}
          onChange={setShowSkeletons}
        />

        <ToggleRow
          label="Email weekly summary"
          description="Pretends to email you a recap of miles and strength sessions."
          checked={emailSummary}
          onChange={setEmailSummary}
        />
      </div>

      <p className="mt-4 text-[0.7rem] text-slate-500">
        These settings are intentionally local-only. They&apos;re here to show
        how I design interactive form controls inside a dashboard card.
      </p>
    </Card>
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/70 px-3 py-2">
      <div>
        <p className="font-medium text-slate-100">{label}</p>
        <p className="text-[0.75rem] text-slate-400">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative mt-1 flex h-6 w-11 items-center rounded-full border transition ${
          checked
            ? "border-emerald-400 bg-emerald-500/30"
            : "border-slate-600 bg-slate-900"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-slate-100 shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
