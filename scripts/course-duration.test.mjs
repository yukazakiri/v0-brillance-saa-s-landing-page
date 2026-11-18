import assert from "node:assert/strict"
import test from "node:test"

import { calendarDurationDays, compareCourseDurations, isFastTrackDuration } from "../lib/course-duration.ts"

test("calendar durations use the whole value and retain the magnitude", () => {
  assert.equal(calendarDurationDays(" 1 YEAR "), calendarDurationDays("12 months"))
  assert.equal(calendarDurationDays("10 years"), 10 * calendarDurationDays("1 year"))
  assert.equal(calendarDurationDays("1.5 years"), calendarDurationDays("18 months"))
  assert.equal(calendarDurationDays("8 weeks"), 56)
  assert.equal(calendarDurationDays("7 days"), calendarDurationDays("1 week"))
})

test("training hours and ambiguous or malformed descriptions are unknown", () => {
  for (const value of [undefined, null, "", "Not listed", "840 hours", "1 semester", "2-4 months", "about 3 months", "1 year 6 months", "-1 year", "0 weeks", "3 months (840 hours)"]) {
    assert.equal(calendarDurationDays(value), null, String(value))
    assert.equal(isFastTrackDuration(value), false, String(value))
  }
})

test("fast-track includes only durations definitely shorter than a calendar year", () => {
  for (const value of ["11 months", "11.999 months", "52 weeks", "364 days"]) assert.equal(isFastTrackDuration(value), true)
  for (const value of ["12 months", "1 year", "365 days", "53 weeks", "10 years"]) assert.equal(isFastTrackDuration(value), false)
})

test("both sort directions keep unknowns last and order known calendar values", () => {
  const courses = [
    { title: "Hours", duration: "100 hours" },
    { title: "Ten", duration: "10 years" },
    { title: "Weeks", duration: "8 weeks" },
    { title: "Months", duration: "3 months" },
    { title: "Missing" },
    { title: "Year", duration: "1 year" },
  ]
  assert.deepEqual([...courses].sort((a, b) => compareCourseDurations(a, b, "asc")).map((c) => c.title),
    ["Weeks", "Months", "Year", "Ten", "Hours", "Missing"])
  assert.deepEqual([...courses].sort((a, b) => compareCourseDurations(a, b, "desc")).map((c) => c.title),
    ["Ten", "Year", "Months", "Weeks", "Hours", "Missing"])
})
