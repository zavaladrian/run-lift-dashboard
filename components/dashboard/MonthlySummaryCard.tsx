import { monthlySummary } from "@/data/runLiftData";
import { Card, CardHeader, Metric } from "./ui";
import { small } from "framer-motion/client";

export function MonthlySummaryCard () {
    return (
        <Card delay= {0.22} >
            <CardHeader
                title="This Month Overview"
                subtitle={monthlySummary.monthLabel}
            />

            <div className="grid grid-cols-2 gap-4 text-sm">
                <Metric
                label="Total miles"
                value={monthlySummary.totalMiles.toFixed(1)}
                small
                />
                <Metric
                label="Strength sessions"
                value={monthlySummary.totalStrengthSessions}
                small
                />
                <Metric
                label="Avg runs / week"
                value={monthlySummary.avgRunsPerWeek.toFixed(1)}
                small
                />
                <Metric
                label="Avg strength / week"
                value={monthlySummary.avgStrengthPerWeek.toFixed(1)}
                small
                />
            </div>

            <p className="mt-4 text-[0.75rem] text-slate-400">
                Longest run this month: {""}
                <span className="font-semibold text-slate-100">
                    {monthlySummary.longestRun.toFixed(1)} mi
                </span>
                . This card is powered by mock monthly aggregates, but the structure is ready for a real API.
            </p>
        </Card>
    );
}