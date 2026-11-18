import type { Course, SubjectArea } from "./types"

export function hasSubjectArea(course: Pick<Course, "subjectAreas">, area: SubjectArea): boolean {
  return Array.isArray(course.subjectAreas) && course.subjectAreas.includes(area)
}
