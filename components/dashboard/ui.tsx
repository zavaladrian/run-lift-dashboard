"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type Intensity = "easy" | "moderate" | "hard";

type CardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Card({ children, className = "", delay = 0 }: CardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40 backdrop-blur ${className}`}
    >
      {children}
    </motion.section>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
};

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </h2>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string | number;
  small?: boolean;
};

export function Metric({ label, value, small }: MetricProps) {
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

export function StreakMetric({ label, value, suffix }: StreakMetricProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-3">
      <p className="text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-emerald-300">{value}</p>
      {suffix && <p className="text-[0.7rem] text-slate-400">{suffix}</p>}
    </div>
  );
}

type ChipProps = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export function Chip({ label, value, icon: Icon }: ChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-1.5 text-xs">
      {Icon && <Icon className="h-3.5 w-3.5 text-emerald-300" />}
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-emerald-400">{value}</span>
    </div>
  );
}

type IntensityPillProps = {
  intensity: Intensity;
};

export function IntensityPill({ intensity }: IntensityPillProps) {
  const labelMap: Record<Intensity, string> = {
    easy: "Easy",
    moderate: "Moderate",
    hard: "Hard",
  };

  const colorMap: Record<Intensity, string> = {
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
