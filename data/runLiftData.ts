// data/runLiftData.ts

export type DayMiles = {
  day: string;
  miles: number;
};

export type WeeklyRunning = {
  weekOf: string;
  totalMiles: number;
  avgPace: string;
  longestRun: number;
  totalTime: string;
  days: DayMiles[];
};

export type Run = {
  id: number;
  date: string;
  type: string;
  distance: number;
  pace: string;
  duration: string;
  intensity: "easy" | "moderate" | "hard";
};

export type StrengthSession = {
  id: number;
  name: string;
  date: string;
  durationMinutes: number;
  focus: string;
  calories: number;
};

export type Task = {
  id: number;
  label: string;
  done: boolean;
};

export type TodaysPlan = {
  date: string;
  focus: string;
  tasks: Task[];
};

export type Streaks = {
  runningStreakDays: number;
  strengthDaysThisWeek: number;
  weeklyWorkouts: number;
};

export const weeklyRunning: WeeklyRunning = {
  weekOf: "2025-11-17",
  totalMiles: 16.4,
  avgPace: "10:45",
  longestRun: 6.2,
  totalTime: "2:58:12",
  days: [
    { day: "Mon", miles: 6.2 },
    { day: "Tue", miles: 0 },
    { day: "Wed", miles: 3.1 },
    { day: "Thu", miles: 4.0 },
    { day: "Fri", miles: 0 },
    { day: "Sat", miles: 3.1 },
    { day: "Sun", miles: 0 },
  ],
};

export const runs: Run[] = [
  {
    id: 1,
    date: "2025-11-17",
    type: "Long Run",
    distance: 6.2,
    pace: "11:00",
    duration: "1:08:12",
    intensity: "easy",
  },
  {
    id: 2,
    date: "2025-11-16",
    type: "Tempo",
    distance: 3.1,
    pace: "9:45",
    duration: "0:30:18",
    intensity: "hard",
  },
  {
    id: 3,
    date: "2025-11-15",
    type: "Easy",
    distance: 4.0,
    pace: "11:15",
    duration: "0:45:10",
    intensity: "easy",
  },
];

export const strengthSessions: StrengthSession[] = [
  {
    id: 1,
    name: "BodyPump 55",
    date: "2025-11-18",
    durationMinutes: 55,
    focus: "Full Body",
    calories: 480,
  },
  {
    id: 2,
    name: "BodyCombat 45",
    date: "2025-11-16",
    durationMinutes: 45,
    focus: "Cardio / Core",
    calories: 420,
  },
  {
    id: 3,
    name: "BodyBalance 30",
    date: "2025-11-15",
    durationMinutes: 30,
    focus: "Mobility / Recovery",
    calories: 150,
  },
];

export const todaysPlan: TodaysPlan = {
  date: "2025-11-18",
  focus: "Easy Run + Pump",
  tasks: [
    { id: 1, label: "4 miles @ easy pace (11:00–11:30 /mi)", done: false },
    { id: 2, label: "BodyPump 55", done: false },
    { id: 3, label: "5–10 min stretch / Balance", done: false },
  ],
};

export const streaks: Streaks = {
  runningStreakDays: 4,
  strengthDaysThisWeek: 3,
  weeklyWorkouts: 5,
};
