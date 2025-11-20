"use client";

import { useState } from "react";
import {
  weeklyRunning,
  lastWeekRunning,
  type DayMiles,
  type WeeklyRunning,
} from "@/data/runLiftData";
import { Card, CardHeader, Metric } from "./ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Range = "thisWeek" | "lastWeek";

export function RunningOverviewCard() {
  const [range, setRange] = useState<Range>("thisWeek");

  const currentWeek: WeeklyRunning =
    range === "thisWeek" ? weeklyRunning : lastWeekRunning;

  const maxMiles =
    currentWeek.days.reduce(
      (max: number, d: DayMiles) => (d.miles > max ? d.miles : max),
      0
    ) || 1;

  return (
    <Card delay={0.05}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <CardHeader
          title="Weekly Running Overview"
          subtitle="Mileage, pace and time at a glance"
        />

        {/* Toggle */}
        <div className="flex rounded-full bg-slate-900/70 p-1 text-xs">
          <button
            type="button"
            onClick={() => setRange("thisWeek")}
            className={`rounded-full px-3 py-1 transition ${
              range === "thisWeek"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setRange("lastWeek")}
            className={`rounded-full px-3 py-1 transition ${
              range === "lastWeek"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Last Week
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric
          label="Miles this week"
          value={currentWeek.totalMiles.toFixed(1)}
        />
        <Metric label="Avg pace" value={currentWeek.avgPace + " /mi"} />
        <Metric
          label="Longest run"
          value={`${currentWeek.longestRun} mi`}
        />
        <Metric label="Total time" value={currentWeek.totalTime} />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
          Daily mileage
        </p>

        <div className="h-56 rounded-2xl bg-slate-950/40 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentWeek.days}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#1f2937"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                domain={[0, maxMiles]}
                tickMargin={6}
              />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                formatter={(value: number) => [`${value.toFixed(1)} mi`, "Miles"]}
              />
              <Bar
                dataKey="miles"
                radius={[999, 999, 0, 0]}
                // color is handled by default; Recharts uses fill prop
                fill="rgba(52, 211, 153, 0.9)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-2 text-[0.7rem] text-slate-500">
          Viewing:{" "}
          <span className="font-semibold text-slate-300">
            {range === "thisWeek" ? "This week" : "Last week"}
          </span>{" "}
          starting{" "}
          {new Date(currentWeek.weekOf).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          .
        </p>
      </div>
    </Card>
  );
}
