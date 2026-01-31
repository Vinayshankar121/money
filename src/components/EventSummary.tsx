import { events } from '@/components/data/events';
import {
  getMostCommonCategory,
  getRegistrationStats,
  getTopDepartments,
} from '@/lib/eventMetrics';

/**
 * Event summary banner component displaying aggregate event statistics.
 * Shows total event count, registration status, top category, and top departments.
 * @component
 */
export function EventSummary() {
  const registrationStats = getRegistrationStats(events);
  const topCategory = getMostCommonCategory(events);
  const topDepartments = getTopDepartments(events, 2);

  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Event Snapshot</p>
          <h3 className="text-xl font-bold">{registrationStats.total} events scheduled</h3>
          <p className="text-sm text-zinc-300">
            {registrationStats.open} open · {registrationStats.closed} closed
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {topCategory && (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Top category: {topCategory}
            </span>
          )}
          {topDepartments.map(({ department, count }) => (
            <span
              key={department}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
            >
              {department}: {count}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
