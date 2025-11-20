// app/run-lift-dashboard/page.tsx
import { Metadata } from "next";
import {
  weeklyRunning,
  runs,
  strengthSessions,
  todaysPlan,
  streaks,
  DayMiles,
  Run,
  StrengthSession,
} from "@/data/runLiftData";

export const metadata: Metadata = {
  title: "Run & Lift Dashboard",
};

export default function RunLiftDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:px-6">
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
            <TodayPlanCard />
            <StreaksCard />
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardHeader() {
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
        <Chip label="Weekly Miles" value={`${weeklyRunning.totalMiles.toFixed(1)} mi`} />
        <Chip
          label="Total Strength Sessions"
          value={`${strengthSessions.length}`}
        />
        <Chip label="Workouts" value={`${streaks.weeklyWorkouts}`} />
      </div>
    </header>
  );
}

type ChipProps = {
  label: string;
  value: string;
};

function Chip({ label, value }: ChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-1.5 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-emerald-400">{value}</span>
    </div>
  );
}

/* --------------------------- Running Overview -------------------------- */

function RunningOverviewCard() {
  const maxMiles =
    weeklyRunning.days.reduce(
      (max: number, d: DayMiles) => (d.miles > max ? d.miles : max),
      0
    ) || 1;

  return (
    <Card>
      <CardHeader
        title="Weekly Running Overview"
        subtitle="Mileage, pace and time at a glance"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Miles this week" value={weeklyRunning.totalMiles.toFixed(1)} />
        <Metric label="Avg pace" value={weeklyRunning.avgPace + " /mi"} />
        <Metric label="Longest run" value={`${weeklyRunning.longestRun} mi`} />
        <Metric label="Total time" value={weeklyRunning.totalTime} />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
          Daily mileage
        </p>
        <div className="flex items-end gap-3">
          {weeklyRunning.days.map((day) => {
            const height = (day.miles / maxMiles) * 100;
            return (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full items-end rounded-full bg-slate-900/60">
                  <div
                    className="w-full rounded-full bg-linear-to-t from-emerald-500/80 to-emerald-300/90 transition-[height]"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[0.7rem] uppercase tracking-wide text-slate-400">
                  {day.day}
                </span>
                <span className="text-[0.7rem] text-slate-300">
                  {day.miles ? `${day.miles.toFixed(1)} mi` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------ Run List ------------------------------- */

function RunListCard() {
  return (
    <Card>
      <CardHeader
        title="Recent Runs"
        subtitle="Last few sessions with type and intensity"
      />

      <div className="mt-2 divide-y divide-slate-800/80">
        {runs.map((run) => (
          <div
            key={run.id}
            className="flex flex-col gap-1 py-3 text-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-medium text-slate-50">
                {run.type}{" "}
                <span className="ml-1 text-xs text-slate-400">
                  {new Date(run.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p className="text-xs text-slate-400">
                {run.distance.toFixed(1)} mi • {run.pace} /mi • {run.duration}
              </p>
            </div>

            <div className="flex items-center gap-2 md:text-xs">
              <IntensityPill intensity={run.intensity} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function IntensityPill({ intensity }: { intensity: Run["intensity"] }) {
  const labelMap: Record<Run["intensity"], string> = {
    easy: "Easy",
    moderate: "Moderate",
    hard: "Hard",
  };

  const colorMap: Record<Run["intensity"], string> = {
    easy: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    moderate: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    hard: "bg-rose-500/15 text-rose-300 border-rose-500/40",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[0.7rem] font-medium ${colorMap[intensity]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labelMap[intensity]}
    </span>
  );
}

/* -------------------------- Strength Overview -------------------------- */

function StrengthOverviewCard() {
  const totalMinutes = strengthSessions.reduce(
    (sum: number, s: StrengthSession) => sum + s.durationMinutes,
    0
  );
  const totalCalories = strengthSessions.reduce(
    (sum: number, s: StrengthSession) => sum + s.calories,
    0
  );

  return (
    <Card>
      <CardHeader
        title="Strength & Les Mills"
        subtitle="This week’s classes and strength volume"
      />

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Sessions" value={`${strengthSessions.length}`} small />
        <Metric label="Total minutes" value={`${totalMinutes}`} small />
        <Metric label="Est. calories" value={`${totalCalories}`} small />
        <Metric
          label="Avg duration"
          value={`${Math.round(totalMinutes / strengthSessions.length) || 0} min`}
          small
        />
      </div>

      <div className="space-y-2">
        {strengthSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-start justify-between rounded-xl bg-slate-900/60 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-slate-50">{session.name}</p>
              <p className="text-xs text-slate-400">
                {new Date(session.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {session.durationMinutes} min • {session.focus}
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-300">
              {session.calories} kcal
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ----------------------------- Today Plan ------------------------------ */

function TodayPlanCard() {
  return (
    <Card>
      <CardHeader
        title="Today’s Plan"
        subtitle={new Date(todaysPlan.date).toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      />

      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
        Focus: {todaysPlan.focus}
      </p>

      <ul className="space-y-2 text-sm">
        {todaysPlan.tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-start gap-2 rounded-xl bg-slate-900/70 px-3 py-2"
          >
            <span
              className={`mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border text-[0.6rem] ${
                task.done
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                  : "border-slate-600 text-slate-500"
              }`}
            >
              {task.done ? "✓" : ""}
            </span>
            <span
              className={
                task.done ? "text-slate-500 line-through" : "text-slate-100"
              }
            >
              {task.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ------------------------------ Streaks -------------------------------- */

function StreaksCard() {
  return (
    <Card>
      <CardHeader
        title="Streaks & Consistency"
        subtitle="Quick look at your habits"
      />

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <StreakMetric
          label="Running streak"
          value={`${streaks.runningStreakDays}`}
          suffix="days"
        />
        <StreakMetric
          label="Strength days"
          value={`${streaks.strengthDaysThisWeek}`}
          suffix="this week"
        />
        <StreakMetric
          label="Total workouts"
          value={`${streaks.weeklyWorkouts}`}
          suffix="this week"
        />
      </div>
    </Card>
  );
}

/* --------------------------- Shared UI bits ---------------------------- */

type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40 backdrop-blur">
      {children}
    </section>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
};

function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string | number;
  small?: boolean;
};

function Metric({ label, value, small }: MetricProps) {
  return (
    <div className="space-y-1">
      <p
        className={`text-xs uppercase tracking-[0.16em] text-slate-500 ${
          small ? "" : "md:text-[0.68rem]"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-semibold text-slate-50 ${
          small ? "text-base" : "text-lg md:text-xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type StreakMetricProps = {
  label: string;
  value: string;
  suffix?: string;
};

function StreakMetric({ label, value, suffix }: StreakMetricProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
      <p className="text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-emerald-300">{value}</p>
      {suffix && (
        <p className="text-[0.7rem] text-slate-400">
          {suffix}
        </p>
      )}
    </div>
  );
}
