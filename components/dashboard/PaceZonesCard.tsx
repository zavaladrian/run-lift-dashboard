"use client";

import { paceZones } from "@/data/runLiftData";
import { Card, CardHeader } from "./ui";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "rgba(52, 211, 153, 0.95)", // emerald
  "rgba(96, 165, 250, 0.95)", // blue
  "rgba(244, 114, 182, 0.95)", // pink
  "rgba(249, 115, 22, 0.95)", // orange
  "rgba(248, 250, 252, 0.9)", // soft white
];

export function PaceZonesCard() {
  const totalMiles = paceZones.reduce((sum, z) => sum + z.miles, 0);

  return (
    <Card delay={0.18}>
      <CardHeader
        title="Pace Zones"
        subtitle="How your weekly mileage is distributed by intensity"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Donut chart */}
        <div className="h-48 md:h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paceZones}
                dataKey="miles"
                nameKey="label"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
              >
                {paceZones.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.label}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)} mi`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / details */}
        <div className="space-y-2 text-xs md:text-[0.75rem]">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
            Weekly miles by zone
          </p>
          <p className="text-sm font-semibold text-slate-50">
            {totalMiles.toFixed(1)} mi this week
          </p>

          <ul className="mt-1 space-y-1.5">
            {paceZones.map((zone, index) => (
              <li
                key={zone.label}
                className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/70 px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="text-[0.75rem] font-medium text-slate-100">
                      {zone.label}
                    </p>
                    <p className="text-[0.7rem] text-slate-400">
                      {zone.range}
                    </p>
                  </div>
                </div>
                <span className="text-[0.75rem] font-semibold text-slate-100">
                  {zone.miles.toFixed(1)} mi
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
