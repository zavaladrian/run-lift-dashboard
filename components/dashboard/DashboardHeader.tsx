"use client"

import { weeklyRunning, strengthSessions, streaks } from "@/data/runLiftData";
import { Chip } from "./ui";
import { Activity, Dumbbell, CalendarRange } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Run &amp; Lift Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Week of{" "}
          {new Date(weeklyRunning.weekOf).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip
          label="Weekly Miles"
          value={`${weeklyRunning.totalMiles.toFixed(1)} mi`}
          icon={Activity}
        />
        <Chip
          label="Strength Sessions"
          value={`${strengthSessions.length}`}
          icon={Dumbbell}
        />
        <Chip
          label="Workouts"
          value={`${streaks.weeklyWorkouts}`}
          icon={CalendarRange}
        />
      </div>
    </header>
  );
}
