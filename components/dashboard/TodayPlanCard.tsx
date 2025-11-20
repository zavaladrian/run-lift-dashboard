import { todaysPlan } from "@/data/runLiftData";
import { Card, CardHeader } from "./ui";
import { CheckCircle2 } from "lucide-react";

export function TodayPlanCard() {
  return (
    <Card delay={0.2}>
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
              className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.7rem] ${
                task.done
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                  : "border-slate-600 text-slate-500"
              }`}
            >
              {task.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : ""}
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
