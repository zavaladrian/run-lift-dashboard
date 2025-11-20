import { runs, type Run } from "@/data/runLiftData";
import { Card, CardHeader, IntensityPill } from "./ui";

export function RunListCard() {
  return (
    <Card delay={0.1}>
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
              <IntensityPill intensity={run.intensity as Run["intensity"]} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
