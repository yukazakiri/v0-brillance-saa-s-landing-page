// Calendar months have variable lengths. For sorting across units, use the
// mean Gregorian year; this is an ordering estimate, not an elapsed schedule.
const DAYS_PER_YEAR = 365.2425

function parseCalendarDuration(value: string | null | undefined): { amount: number; unit: string } | null {
  if (typeof value !== "string") return null
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*(years?|months?|weeks?|days?)$/i)
  if (!match) return null

  const amount = Number(match[1])
  if (!Number.isFinite(amount) || amount <= 0) return null
  return { amount, unit: match[2].toLowerCase() }
}

export function calendarDurationDays(value: string | null | undefined): number | null {
  const parsed = parseCalendarDuration(value)
  if (!parsed) return null
  const { amount, unit } = parsed
  const daysPerUnit = unit.startsWith("year") ? DAYS_PER_YEAR
    : unit.startsWith("month") ? DAYS_PER_YEAR / 12
    : unit.startsWith("week") ? 7
    : 1
  const days = amount * daysPerUnit
  return Number.isFinite(days) ? days : null
}

export function isFastTrackDuration(value: string | null | undefined): boolean {
  const parsed = parseCalendarDuration(value)
  if (!parsed) return false
  const { amount, unit } = parsed
  if (unit.startsWith("year")) return amount < 1
  if (unit.startsWith("month")) return amount < 12
  // 365 days is not necessarily less than a calendar year.
  return amount * (unit.startsWith("week") ? 7 : 1) < 365
}

export function compareCourseDurations(
  a: { duration?: string | null; title: string },
  b: { duration?: string | null; title: string },
  direction: "asc" | "desc",
): number {
  const aDays = calendarDurationDays(a.duration)
  const bDays = calendarDurationDays(b.duration)
  if (aDays === null && bDays === null) return a.title.localeCompare(b.title)
  if (aDays === null) return 1
  if (bDays === null) return -1
  return (aDays - bDays) * (direction === "asc" ? 1 : -1)
}
