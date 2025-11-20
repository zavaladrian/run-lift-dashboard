import { streaks } from "@/data/runLiftData";
import { Card, CardHeader, StreakMetric } from "./ui";

export function StreaksCard() {
  return (
    <Card delay={0.25}>
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
