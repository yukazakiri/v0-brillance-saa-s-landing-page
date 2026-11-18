import assert from "node:assert/strict"
import test from "node:test"

import { hasSubjectArea } from "../lib/sanity/subject-areas.ts"

test("subject areas match only explicitly selected values", () => {
  const course = { subjectAreas: ["tech", "business"] }
  assert.equal(hasSubjectArea(course, "tech"), true)
  assert.equal(hasSubjectArea(course, "business"), true)
  assert.equal(hasSubjectArea(course, "hospitality"), false)
})

test("missing, empty, unknown, and malformed metadata never classify a course", () => {
  for (const subjectAreas of [undefined, null, [], ["unknown"], "tech"]) {
    assert.equal(hasSubjectArea({ subjectAreas }, "tech"), false)
  }
})
