import type { Course } from "./types";

export function formatCourseDeliveryMode(mode?: string | null): string {
  const normalizedMode = mode?.trim();
  if (!normalizedMode) return "Not listed";

  return normalizedMode
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function hasCourseFinancialAidInfo(
  course: Pick<Course, "scholarshipsAvailable" | "financialAidHighlight">,
): boolean {
  return Boolean(
    course.scholarshipsAvailable || course.financialAidHighlight?.trim(),
  );
}
