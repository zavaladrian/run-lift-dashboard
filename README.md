Project: Run & Lift Dashboard

Run & Lift Dashboard is a fitness analytics UI that brings my running and strength training into a single, focused view. The dashboard shows weekly mileage, recent runs, Les Mills–style strength sessions, and a simple “Today’s Plan” checklist so the user always knows what’s next.

I built this as a front-end–focused project to practice designing a real-world dashboard layout with modern React tooling. The app uses the Next.js App Router with TypeScript and Tailwind CSS for styling. Data is currently mocked in a typed runLiftData.ts module so it can easily be swapped for a real API later.

From a UI perspective, I leaned into a dark, neon-accented fitness theme with rounded cards, soft shadows, and subtle glassmorphism. Components like Card, Metric, Chip, and StreakMetric live in a shared components/dashboard folder, which keeps the page file small and the design system reusable. I added motion with Framer Motion so each card eases into view, which makes the dashboard feel more like a polished product and less like a static mockup.

For the running analytics, I integrated Recharts to render a responsive bar chart of daily mileage. A simple “This Week / Last Week” toggle swaps between two typed WeeklyRunning data sets, updating both the metrics and the chart. This shows how I handle UI state, data modeling, and interactive visualization in a clean, composable way.

Tech highlights:

Next.js (App Router) + TypeScript for structure, routing, and type safety

Tailwind CSS for rapid, utility-first styling and consistent spacing/typography

Framer Motion for subtle card entrance animations

Recharts for responsive, interactive daily mileage charts

Lucide React for lightweight iconography in chips and task lists

Modular dashboard components for a layout that’s easy to extend and refactor