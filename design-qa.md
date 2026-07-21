# Website Design QA

- Directory source: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\courses-after-1440x1024.png`
- Directory mobile reveal: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\courses-mobile-reveal-375x812.png`
- Detail source: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\course-detail-before-1440x1024.png`
- Detail implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\course-detail-after-1440x1024.png`
- Viewports: 375 × 812 and 1440 × 1024
- State: light theme, live CMS course data

## Comparison Evidence

The original detail page and redesigned detail page were opened together at the same 1440 × 1024 viewport. The comparison confirmed the intentional shift from stacked cards, repeated pills, and a sticky information panel to a single editorial hierarchy: title, summary, core facts, overview, and progressive disclosures.

The course directory was also reviewed at 375px after scrolling to the first course. Because touch devices cannot rely on hover, the description, duration, and study load remain visible on mobile. At desktop breakpoints those details use a collapsed CSS grid and reveal on row hover or keyboard focus.

## Findings

No actionable P0, P1, or P2 findings remain.

- Typography: Instrument Serif leads program titles and section headings; Inter handles navigation, labels, facts, and reading copy. The new detail title has a strong editorial scale without clipping.
- Hierarchy: the first viewport now communicates the program, summary, primary actions, duration, total units or training hours, delivery format, and credential without nested cards.
- Progressive disclosure: curriculum, learning experience, career direction, and admissions use native semantic `details` and `summary` elements. Click activation was verified in the browser.
- Data accuracy: degree programs display live CMS credit totals; TESDA programs display live training-hour totals and actual CMS durations.
- Responsive behavior: the 375px directory has no document-level horizontal overflow. Course reveal content is readable without hover and facts reflow into two columns.
- Accessibility: directory rows remain semantic links with visible focus treatment; detail disclosures are native keyboard-focusable controls; headings, lists, facts, contact links, and reduced-motion styles remain semantic.
- Design system: all new surfaces use existing cream, navy, gold-neutral, border, typography, Button, and Badge tokens. No hard-coded colors, gradients, placeholder imagery, or decorative artwork were added.

## Verification

- Next.js 16.2.1 production build passed with webpack in an isolated build directory.
- Twelve active CMS course-detail routes were generated.
- Directory-to-BSIT navigation passed.
- Curriculum disclosure click activation passed.
- `npx tsc --noEmit --incremental false` reports only the documented pre-existing Radix Slot/React mismatch in shared Button and Badge primitives.
- The only browser console error is the pre-existing OpenPanel development fetch failure.

## Follow-up Polish

- P3: OpenPanel analytics cannot post from the local development environment; this does not affect the course UI or production compilation.
- P3: the shared shadcn Button and Badge Radix Slot type mismatch remains a repository baseline.

## Landing About Section

- Source visual truth: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\about-section-before-1440x1024.png`
- Initial implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\about-section-after-1440x1024.png`
- Refined desktop implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\about-section-refined-1440x1024.png`
- Refined mobile implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\about-section-refined-mobile-375x812.png`
- Viewports: 1440 × 1024 and 375 × 812
- State: light theme, homepage `#about`, live CMS settings

The initial and refined desktop captures were opened together in the same comparison input. A focused region comparison was not needed because the section fills the viewport and all display typography, highlighted phrases, proof-point labels, dividers, body copy, and the primary link are clearly readable at this scale.

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the redesign uses the existing Instrument Serif/Inter editorial hierarchy. Gold emphasis on “Baguio” and paper-toned inline highlights create deliberate focal points without reducing readability. Heading wrapping remains intentional at desktop and mobile widths.
- Spacing and layout rhythm: one 1200px grid aligns the statement, student-promise panel, richer proof points, and mission content. Mobile stacks cleanly with no document-level horizontal overflow.
- Colors and tokens: the section now uses only existing semantic foreground, muted, border, and Button tokens; previous hard-coded colors and the decorative hatch pattern were removed.
- Image quality: the source section contained no essential image asset, so the typography-led redesign correctly introduces no placeholder or fabricated artwork.
- Copy and content: the lead statement remains concise, while the highlighted student promise and short fact explanations add substance. Mission and vision use live CMS values; proof points retain the established 1970 history, Baguio location, and CHED/TESDA pathways.
- Interaction: “Discover our story” was clicked in the browser and navigated successfully to `/about`.
- Accessibility: the section now has a named semantic region, real heading hierarchy, definition-list proof points, a visible focusable link, and a working `#about` anchor.
- Production verification: the Next.js 16.2.1 webpack build passed and generated the homepage and `/about` route successfully.

### About refinement history

- The first redesign met the minimal direction but the user requested stronger highlights and slightly more content.
- Added selective semantic gold emphasis, paper-toned highlighted phrases, a student-promise narrative panel, and explanatory copy beneath all three proof points.
- The post-fix desktop and mobile captures show the richer hierarchy without overflow, card clutter, hard-coded color values, or a loss of whitespace.

## Newsroom Redesign

- Homepage source visual truth: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\home-news-before-1440x1024.png
- Homepage implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\home-news-after-1440x1024.png
- News archive desktop implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\news-after-1440x1024.png
- News archive mobile implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\news-after-390x844.png
- Viewports: 390 × 844 and 1440 × 1024
- State: light theme, live Sanity news data

The homepage source and implementation were opened together in the same comparison input. The comparison confirmed the intended shift from a centered, oversized heading followed by repeated image-and-copy blocks to a left-aligned editorial lead, one strong photograph, and a compact numbered story index. The original news archive was also inspected through its live semantic tree before implementation; it used the same repeated full-card pattern and included a gallery with non-destination links.

No actionable P0, P1, or P2 findings remain.

- Typography and hierarchy: Instrument Serif carries the editorial headlines, while Inter handles labels, metadata, search, filters, and reading copy. Gold-neutral text highlights use the existing secondary token and remain readable.
- Homepage density: one featured story and three text-first updates replace four equally large editorial blocks. The primary “View all news” action is visible in the section header.
- Archive interaction: live search, topic filters, result counts, clear-search, reset, and empty states were exercised in the browser. Search reduced the result set to one matching story; combining that search with a non-matching category produced the intentional empty state; reset restored all nine stories.
- Responsive behavior: topic controls scroll horizontally at narrow widths, the search control retains a visible label, and the editorial results reflow without document-level horizontal overflow.
- Content and links: categories are derived from live post data, dates use semantic time elements, and every story uses its existing news detail route. The old gallery and its non-destination links were removed.
- Accessibility: search uses a real label, topic buttons expose aria-pressed, result counts use aria-live, empty-state recovery uses a semantic button, and links and controls retain visible focus treatment.
- Design system: the implementation uses the existing cream, navy, gold, border, Badge, Button, and Input primitives. No new hard-coded colors, gradients, placeholder artwork, or decorative SVGs were added.
- Production verification: the Next.js 16.2.1 webpack build passed in an isolated build directory and generated the news archive plus all nine active news-detail routes.

### Newsroom follow-up polish

- P3: local development still reports the repository’s pre-existing invalid Facebook token and OpenPanel analytics fetch errors. Sanity news remains available and the production build completes successfully.
- P3: the TypeScript check continues to report only the documented shared Radix Slot/React type mismatch in Button and Badge.

## College Degree Programs Poster Redesign

- Selected visual target: C:\Users\MIS\.codex\generated_images\019f7dcd-cc1c-7360-b764-1e32497d44b5\exec-09c94728-2bd9-40d7-b9a1-9382150e50ae.png
- Initial desktop implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\college-programs-option1-after-1440x1024.png
- Refined desktop implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\college-programs-option1-refined-1440x1024.png
- Mobile implementation: C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\design-qa\college-programs-option1-mobile-390x844.png
- Viewports: 1440 × 1024 and 390 × 844
- State: light theme, College tab selected, live Sanity course data

The selected ImageGen target and both desktop captures were opened together in the same comparison input. The selected direction is a three-futures editorial poster spread: one integrated pathway bar, a large impact-oriented statement, three typographic degree fields, a quiet gold middle-field tint, oversized acronym layers, and one Explore action per program. A separate mobile capture verified the responsive translation because the source target was desktop-only.

### Comparison history

- Initial P2: the first implementation preserved too much top padding and used a taller poster minimum height, pushing the Explore actions below the 1024px comparison viewport.
- Fix: reduced section and introduction padding, tightened the display heading scale and width, limited support copy to two lines, and reduced the desktop poster minimum height.
- Post-fix evidence: the refined desktop capture keeps all three Explore actions visible while preserving the selected target’s hierarchy and generous whitespace.

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the implementation uses the project’s real Instrument Serif and Inter font variables. Display statements, formal degree names, support copy, duration, and actions retain the target’s clear editorial hierarchy without synthetic image text.
- Spacing and layout rhythm: the 1320px section frame, integrated pathway bar, two-column introduction, three equal poster fields, thin rules, and tinted middle field closely reproduce the source composition. Mobile intentionally changes to a vertical poster sequence rather than shrinking the desktop spread.
- Colors and tokens: cream, navy, gold tint, borders, foreground, muted copy, focus rings, Buttons, and Tabs use existing semantic design tokens. No gradients, heavy shadows, or hard-coded color values were added.
- Image quality and assets: the selected concept contains no program photography or illustration. The only real image asset is the existing DCCP header logo outside the redesigned component; no placeholder imagery, custom SVG artwork, or CSS illustration was introduced.
- Copy and content: live CMS titles, durations, descriptions, credentials, category counts, and course slugs drive the posters. The three College statements match the selected visual target: Build businesses, Create experiences, and Shape technology.
- Interaction: College and TESDA tabs were tested by click and keyboard ArrowRight navigation. TESDA replaces the heading and all three visible posters with live TESDA course content. College was restored as the deliverable state.
- Links: Browse all programs, category links, every Explore program route, and the existing Call and Email admissions actions resolve to real destinations.
- Accessibility and responsiveness: the Radix tablist exposes active and selected semantics, focus rings remain visible, each poster is one semantic link, headings remain ordered, and the 390px viewport has no document-level horizontal overflow.
- Console and build: the only browser console error is the existing OpenPanel local analytics fetch failure. The isolated Next.js 16.2.1 webpack production build passed and generated the homepage plus all active course routes.

### Follow-up polish

- P3: the selected ImageGen target is 1536px wide while the local validation viewport is 1440px, so the comparison evaluates proportion and hierarchy rather than one-to-one pixel coordinates.
- P3: the documented shared Radix Slot/React type mismatch remains isolated to the existing Button and Badge primitives.

## FAQ and Closing CTA Redesign

- Selected visual target: `C:\Users\MIS\.codex\generated_images\019f7dcd-cc1c-7360-b764-1e32497d44b5\exec-f9640276-a1bb-48bf-9a72-c76546a3fc54.png`
- Final desktop implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\faq-cta-final-desktop.png`
- Focused CTA implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\faq-cta-final-cta.png`
- Mobile FAQ implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\faq-cta-implementation-mobile.png`
- Mobile CTA implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\faq-cta-implementation-mobile-cta.png`
- Tablet implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\faq-cta-implementation-tablet.png`
- Viewports: 375 x 844, 768 x 1024, and 1440 x 1024
- State: light theme, homepage `#faq`, live Sanity FAQ and settings data, second accordion item open

The selected ImageGen target and the final browser captures were opened together in the same comparison input. The full-view comparison verified the two-column editorial FAQ hierarchy, numbered question ledger, open-answer state, and direct transition into the full-width navy CTA. A focused CTA capture was also compared because the sticky site header and the live eighth FAQ move the closing band below the first desktop viewport.

### Comparison history

- Initial P1: the CTA section inherited intrinsic sizing from the site shell's centered flex container, producing a narrow navy panel rather than the target's full-width closing band.
- Initial P2: the FAQ and CTA remained separate children of the shell's 66px section gap, weakening the intended single closing journey.
- Fix: wrapped the FAQ and CTA in one full-width homepage journey container and made both semantic sections explicitly full width.
- Post-fix evidence: the final CTA measures 1400px inside the site's 1400px framed canvas, begins immediately after the FAQ, and retains the target's navy/gold composition at desktop and mobile sizes.

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the implementation uses the existing Instrument Serif and Inter variables. The large serif question and CTA statements, small uppercase eyebrow, numbered labels, body copy, and button labels reproduce the target's editorial hierarchy without image-based text.
- Spacing and layout rhythm: the FAQ uses the target's asymmetric two-column grid, thin ruled list, compact open-answer rhythm, and aligned closing CTA. The live CMS contains eight questions rather than the target's seven; preserving that source-of-truth content is an intentional product constraint.
- Colors and tokens: cream, navy, gold, foreground, muted copy, borders, focus rings, and Button states use existing semantic design tokens. The previous decorative gradient and patterned CTA background were removed.
- Image quality and assets: the selected concept contains no photography or illustration. Plus and minus controls use the project's established Lucide icon system; no generated placeholders, inline SVGs, or CSS artwork were introduced.
- Copy and content: all FAQ questions and Portable Text answers remain CMS-driven. The supporting copy is student- and parent-focused. `Apply now` links to `/apply`, while `Talk to admissions` resolves to the live CMS admissions email and is omitted when no contact destination exists.
- Interaction and accessibility: the Radix/shadcn accordion keeps exactly one item open, exposes native buttons with `aria-expanded` and `aria-controls`, supports ArrowDown keyboard focus movement, and has a visible focus ring. Click activation and single-open behavior passed. The FAQ and CTA have named semantic regions and ordered headings.
- Responsive behavior: 375px, 768px, and 1440px checks show no document-level horizontal overflow. The grid stacks on phone and tablet widths, questions remain readable, and CTA actions become a vertical, touch-friendly sequence.
- Production verification: the isolated Next.js 16.2.1 webpack build passed and generated the homepage plus all existing routes. `npx tsc --noEmit --incremental false` reports only the documented pre-existing Radix Slot/React mismatch in shared Button and Badge primitives.
- Console verification: the local page retains the previously documented OpenPanel development fetch issue; no FAQ or CTA runtime error was introduced.

### Follow-up polish

- P3: the selected target is a standalone 1536px-wide composition, while the browser implementation is shown inside the site's existing framed 1400px shell and sticky header at 1440px. The comparison therefore evaluates hierarchy, proportions, and behavior rather than exact canvas coordinates.

## Classic Light Mega-Footer Redesign

- Selected visual target: `C:\Users\MIS\.codex\generated_images\019f7dcd-cc1c-7360-b764-1e32497d44b5\exec-501e88a7-3b21-408a-aa89-f2764ea10406.png`
- Desktop implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\footer-option1-final-desktop.png`
- Tablet implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\footer-option1-final-tablet.png`
- Mobile implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\footer-option1-mobile-top.png`
- Viewports: 375 x 844, 768 x 900, and 1440 x 1000
- State: light theme, live Sanity settings data, homepage scrolled to the CTA/footer transition

The selected ImageGen target, the final desktop browser capture, and the mobile browser capture were opened together in the same comparison input. The full-view comparison verified the seamless navy-to-cream transition, wider brand/contact column, four compact navigation groups, serif heading hierarchy, gold rules, restrained social controls, and separated legal row. A separate focused crop was not required because all footer typography, icons, rules, and link groupings are legible at the captured resolution; the mobile capture provides the focused responsive evidence.

### Comparison history

- First comparison: no actionable P0, P1, or P2 fidelity differences were found, so no visual-fix iteration was required.
- Intentional product constraint: the selected mock includes privacy, terms, careers, handbook, and campus-map destinations that do not exist in the application. The implementation preserves the target's information architecture while replacing those dead ends with verified course, college, support, parent, alumni, sitemap, and CMS admissions destinations.

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the footer uses the existing Instrument Serif and Inter variables. Serif navigation headings and the brand name reproduce the target's editorial hierarchy while compact Inter body and link text preserve readability.
- Spacing and layout rhythm: the desktop layout retains the target's wide brand column and four even navigation columns, with a single gold-tinted divider above the bottom row. Tablet uses four compact link columns beneath the brand; mobile uses a readable two-column navigation grid. The footer follows the CTA without the site's former 66px inter-section gap.
- Colors and tokens: the implementation uses the existing semantic cream background, navy primary, gold secondary, muted foreground, border, and focus-ring tokens. The previous footer gradient and decorative pattern were removed.
- Image quality and assets: the real CMS primary logo is rendered through the existing Sanity image helper at an appropriate size. Social and contact symbols use the project's established Lucide icon system. No placeholder images, custom SVGs, CSS artwork, gradients, or decorative raster assets were introduced.
- Copy and content: the CMS tagline, address, telephone, email, logo alt text, and social destinations render conditionally. Navigation uses real application routes, including the three active degree-detail slugs and the CMS-backed `/courses` catalog.
- Interaction and accessibility: the footer is a semantic `footer` with labeled navigation and contact address content. Links have visible focus treatment, external social destinations include safe rel attributes and descriptive labels, and the FAQ footer link was clicked successfully to `/#faq`.
- Responsive behavior: browser measurements at 375px, 768px, and 1440px show the document width equals the viewport width, so no horizontal overflow is present. Missing CMS contact or social fields are omitted without leaving empty controls.
- Production verification: the isolated Next.js 16.2.1 webpack build passed and generated all existing routes, including the homepage, sitemap, and active course-detail pages. `npx tsc --noEmit --pretty false` reports only the documented pre-existing Radix Slot/React mismatch in shared Button and Badge primitives.
- Console verification: the existing OpenPanel development analytics request still fails locally; no footer runtime error was introduced.

### Follow-up polish

- P3: the reference mock is a standalone 1536px canvas, while the browser capture is rendered inside the site's existing 1400px framed shell with its fixed header and local development overlays. The comparison therefore evaluates the footer's hierarchy, proportions, and responsive behavior rather than one-to-one canvas coordinates.

## Student Portal Option 1 Landing Page

- Selected visual target: `C:\Users\MIS\.codex\generated_images\019f7dcd-cc1c-7360-b764-1e32497d44b5\exec-275c66db-5321-49b0-ba79-a4deaa0060f5.png`
- Desktop hero implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\portal-option1-final-top-1440x1024.png`
- Desktop portal-tour implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\portal-option1-final-tour-1440x1024.png`
- Desktop closing/footer implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\portal-option1-final-bottom-1440x1024.png`
- Mobile hero implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\portal-option1-final-mobile-390x844.png`
- Mobile navigation implementation: `C:\Users\MIS\Documents\Codex\2026-07-20\i-want-you-to-please-change\work\portal-option1-final-mobile-menu-390x844.png`
- Viewports: 390 x 844 and 1440 x 1024
- State: light theme, live Sanity portal/settings content, dedicated Student Portal journey

The selected ImageGen target and the final desktop and mobile browser captures were opened together in the same comparison input. The full-view evidence verifies the target's cream editorial hero, dashboard-led hierarchy, ruled feature directory, navy product tour, three-step onboarding, support strip, closing CTA, and seamless shared footer. Focused captures verify the dashboard tour, closing journey, and expanded mobile navigation.

### Comparison history

- First comparison: no actionable P0, P1, or P2 visual fidelity findings remained after implementation.
- Runtime polish: the above-the-fold student dashboard was changed from the deprecated priority hint to explicit eager loading after the local browser surfaced an LCP warning.
- Intentional product constraint: the live CMS currently contains faculty-oriented screenshots and no student-specific dashboard asset. A dedicated student dashboard was generated and added so the page does not misrepresent the Student Portal.

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the landing page uses the existing Instrument Serif and Inter variables. Large serif statements, small uppercase gold labels, compact navigation, and restrained supporting copy closely preserve the selected direction's editorial hierarchy.
- Spacing and layout rhythm: the desktop hero uses an asymmetric text/dashboard grid, the feature directory uses thin ruled rows, the navy portal-tour band centers the product interface between concise callouts, and the closing sections maintain a clear narrative cadence without nested-card density.
- Colors and tokens: cream, navy, gold, foreground, muted copy, borders, focus rings, and Button states use the existing semantic design tokens. No gradients, heavy shadows, hard-coded colors, decorative SVGs, or CSS illustration were added.
- Image quality and assets: `public/images/student-portal-dashboard.png` is a purpose-built high-resolution DCCPHub student dashboard showing classes, credits, attendance, GPA, schedule, assignments, calendar, announcements, and resources. It is rendered through Next Image in both showcase locations with meaningful alternative text.
- Copy and content: CMS hero, overview, portal destination, support email, telephone, footer contact details, and footer navigation remain integrated. The experience framing is dedicated to students; Faculty Portal promotion was removed from this route.
- Interaction and accessibility: the desktop Portal tour link resolves uniquely and lands at the named section with the sticky-header offset. At mobile width, the menu button exposes `aria-expanded`, the menu opens with all destinations, selecting Portal tour closes it, and the route lands at `#portal-tour`. Semantic regions, ordered headings, real links/buttons, visible focus states, and external-link safety attributes are preserved.
- Responsive behavior: at 390px the hero and dashboard stack into one column, the mobile navigation is touch-friendly, and document width equals viewport width. At 1440px the hero, feature rows, product tour, support strip, CTA, and footer retain the selected desktop composition without horizontal overflow.
- Production verification: the isolated Next.js 16.2.1 webpack production build passed and generated `/portal` plus all existing routes. The TypeScript check continues to report only the documented pre-existing Radix Slot/React mismatch in shared Button and Badge primitives.
- Console verification: the portal introduces no route-specific runtime error. The local environment retains the previously documented OpenPanel analytics fetch failure.

### Follow-up polish

- P3: the selected target is a single 864px-wide generated overview, while the browser evidence uses real desktop and mobile viewports inside the existing application shell. Fidelity is evaluated through hierarchy, proportions, system styling, and responsive behavior rather than one-to-one canvas coordinates.

final result: passed
