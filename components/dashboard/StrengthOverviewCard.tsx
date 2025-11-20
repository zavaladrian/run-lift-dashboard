import { strengthSessions, type StrengthSession } from "@/data/runLiftData";
import { Card, CardHeader, Metric } from "./ui";

export function StrengthOverviewCard() {
  const totalMinutes = strengthSessions.reduce(
    (sum: number, s: StrengthSession) => sum + s.durationMinutes,
    0
  );
  const totalCalories = strengthSessions.reduce(
    (sum: number, s: StrengthSession) => sum + s.calories,
    0
  );

  return (
    <Card delay={0.15}>
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
              <p className="text-sm font-medium text-slate-50">
                {session.name}
              </p>
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
