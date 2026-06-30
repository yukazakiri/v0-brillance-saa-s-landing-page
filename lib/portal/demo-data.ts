/**
 * Hardcoded demo content for the DCCPHub portal showcase page.
 *
 * This is intentionally self-contained (no Sanity dependency on the portal
 * route). All section components consume this single source of truth so the
 * page can be iterated on purely in code.
 */

export type Persona = "student" | "faculty"

/** Keys mapped to lucide-react icons inside `<Icon glyph={...} />`. */
export type IconKey =
  | "graduationCap"
  | "users"
  | "bookOpen"
  | "lifeBuoy"
  | "calendar"
  | "clipboardCheck"
  | "barChart"
  | "messageSquare"
  | "wallet"
  | "shield"
  | "zap"
  | "layers"

export type MockupKey = "dashboard" | "faculty" | "lms"

export interface PortalStat {
  value: number
  suffix?: string
  label: string
}

export interface PortalPillar {
  id: string
  title: string
  description: string
  iconKey: IconKey
}

export interface PortalAnnotation {
  id: string
  label: string
  /** Position on the mockup, expressed as a percentage (0-100). */
  x: number
  y: number
}

export interface PortalFeature {
  id: string
  label: string
  iconKey: IconKey
  description: string
  mockupKey: MockupKey
  annotations: PortalAnnotation[]
}

export interface PortalTestimonial {
  id: string
  name: string
  program: string
  quote: string
  highlight?: boolean
}

export interface PortalStep {
  stepNumber: number
  title: string
  description: string
}

export interface PortalSpecRow {
  label: string
  student: string
  faculty: string
}

export interface PortalSpecGroup {
  category: string
  rows: PortalSpecRow[]
}

export interface PortalDemoData {
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    stats: PortalStat[]
  }
  overview: {
    title: string
    description: string
    pillars: PortalPillar[]
  }
  features: PortalFeature[]
  showcase: {
    title: string
    subtitle: string
  }
  metrics: PortalStat[]
  testimonials: PortalTestimonial[]
  personas: Record<
    Persona,
    { label: string; tagline: string; highlights: string[] }
  >
  gettingStarted: {
    title: string
    description: string
    steps: PortalStep[]
  }
  specs: {
    title: string
    description: string
    groups: PortalSpecGroup[]
  }
  cta: {
    heading: string
    subheading: string
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
}

const PORTAL_BASE = "https://portal.dccp.edu.ph"

export const authUrl = (persona: Persona): string =>
  `${PORTAL_BASE}/login?role=${persona}`

export const registerUrl = `${PORTAL_BASE}/signup`

export const portalDemo: PortalDemoData = {
  hero: {
    eyebrow: "Student & Faculty Gateway",
    heading: "One hub. Every academic tool. Built for DCCP.",
    subheading:
      "DCCPHub brings your grades, enrollment, learning materials, and faculty tools into a single, beautifully simple workspace \u2014 accessible from any device, anywhere in Baguio and beyond.",
    primaryCta: { label: "Sign In", href: `${PORTAL_BASE}/login` },
    secondaryCta: { label: "Create Account", href: registerUrl },
    stats: [
      { value: 4200, suffix: "+", label: "Active Learners" },
      { value: 60, suffix: "+", label: "Courses Online" },
      { value: 180, suffix: "+", label: "Faculty Members" },
    ],
  },

  overview: {
    title: "Everything your academic life needs, in one place",
    description:
      "DCCPHub replaces scattered logins and paper forms with a unified digital campus. Check your standing, enroll in seconds, collaborate with faculty, and never miss a deadline.",
    pillars: [
      {
        id: "academics",
        title: "Academics, simplified",
        description:
          "Real-time grades, class schedules, and enrollment status \u2014 no more waiting in line at the registrar.",
        iconKey: "graduationCap",
      },
      {
        id: "community",
        title: "A connected campus",
        description:
          "Message faculty, join course groups, and stay in sync with announcements across every subject.",
        iconKey: "users",
      },
      {
        id: "resources",
        title: "Resources on demand",
        description:
          "The LMS, digital library, and lecture recordings live side-by-side inside your dashboard.",
        iconKey: "bookOpen",
      },
      {
        id: "support",
        title: "Support that responds",
        description:
          "Guided onboarding, in-app help, and a dedicated helpdesk for students and faculty alike.",
        iconKey: "lifeBuoy",
      },
    ],
  },

  features: [
    {
      id: "grades",
      label: "Grades & Standing",
      iconKey: "clipboardCheck",
      description:
        "See your grades the moment faculty post them. Track your GWA per semester, per subject, with visual trend lines so you always know where you stand.",
      mockupKey: "dashboard",
      annotations: [
        { id: "a1", label: "Live GWA ticker", x: 22, y: 28 },
        { id: "a2", label: "Per-subject breakdown", x: 70, y: 52 },
        { id: "a3", label: "Trend at a glance", x: 38, y: 74 },
      ],
    },
    {
      id: "enrollment",
      label: "One-click Enrollment",
      iconKey: "calendar",
      description:
        "Browse open sections, check prerequisites automatically, and lock in your schedule in under a minute \u2014 with conflict detection built in.",
      mockupKey: "lms",
      annotations: [
        { id: "b1", label: "Available sections", x: 30, y: 34 },
        { id: "b2", label: "Smart conflict check", x: 68, y: 46 },
        { id: "b3", label: "Confirmed in seconds", x: 52, y: 78 },
      ],
    },
    {
      id: "lms",
      label: "Learning Management",
      iconKey: "bookOpen",
      description:
        "Every syllabus, assignment, and lecture recording in one clean interface. Submit work, get feedback, and never lose track of a due date again.",
      mockupKey: "lms",
      annotations: [
        { id: "c1", label: "Course modules", x: 26, y: 30 },
        { id: "c2", label: "Upcoming deadlines", x: 64, y: 42 },
        { id: "c3", label: "Lecture recordings", x: 44, y: 70 },
      ],
    },
    {
      id: "analytics",
      label: "Faculty Analytics",
      iconKey: "barChart",
      description:
        "Faculty get a real-time pulse on class performance: at-risk students surface automatically, so interventions happen early, not after midterms.",
      mockupKey: "faculty",
      annotations: [
        { id: "d1", label: "Class-wide averages", x: 28, y: 32 },
        { id: "d2", label: "At-risk flags", x: 66, y: 50 },
        { id: "d3", label: "Bulk grade entry", x: 40, y: 72 },
      ],
    },
    {
      id: "messages",
      label: "Direct Messaging",
      iconKey: "messageSquare",
      description:
        "Reach any instructor or classmate without leaving the hub. Threaded conversations, read receipts, and file sharing \u2014 all archived for later.",
      mockupKey: "dashboard",
      annotations: [
        { id: "e1", label: "Threaded inbox", x: 32, y: 36 },
        { id: "e2", label: "Faculty office hours", x: 62, y: 58 },
      ],
    },
    {
      id: "payments",
      label: "Fees & Payments",
      iconKey: "wallet",
      description:
        "View your statement, download official receipts, and pay tuition online through partnered, secure payment channels \u2014 tracked to the centavo.",
      mockupKey: "dashboard",
      annotations: [
        { id: "f1", label: "Current balance", x: 30, y: 30 },
        { id: "f2", label: "Payment history", x: 64, y: 54 },
        { id: "f3", label: "Download receipts", x: 48, y: 76 },
      ],
    },
  ],

  showcase: {
    title: "Step inside the hub",
    subtitle:
      "Scroll through a live tour of the DCCPHub experience \u2014 from the student dashboard to the faculty gradebook. This is where campus meets cloud.",
  },

  metrics: [
    { value: 99.9, suffix: "%", label: "Uptime" },
    { value: 12, suffix: "k", label: "Assignments submitted weekly" },
    { value: 4, suffix: "min", label: "Avg. enrollment time" },
    { value: 24, suffix: "/7", label: "Access from any device" },
  ],

  testimonials: [
    {
      id: "t1",
      name: "Maria Santos",
      program: "BS Information Technology, Year 3",
      quote:
        "I used to chase down three different websites for my grades, my schedule, and my assignments. DCCPHub put all of it in one place. Enrollment took me four minutes this semester.",
      highlight: true,
    },
    {
      id: "t2",
      name: "Prof. Reyes Aquino",
      program: "Faculty, Computer Studies",
      quote:
        "The analytics view flags struggling students before midterm even hits. I can reach out early instead of after the damage is done. It changed how I teach.",
    },
    {
      id: "t3",
      name: "Jared P. Mendoza",
      program: "BS Business Administration, Year 2",
      quote:
        "I checked my grades on the jeepney ride home. That alone sold me.",
    },
    {
      id: "t4",
      name: "Engr. Liza Fernandez",
      program: "Faculty, Engineering",
      quote:
        "Bulk grade entry used to eat my Friday afternoons. Now it's done in one coffee break.",
    },
    {
      id: "t5",
      name: "Andrea Cruz",
      program: "BS Hospitality Management, Year 4",
      quote:
        "The deadline reminders saved my OJT requirements more than once. I actually trust the system now.",
    },
    {
      id: "t6",
      name: "Mark Dela Pe\u00f1a",
      program: "BS Computer Science, Year 1",
      quote:
        "First day of college and I already knew where everything was. DCCPHub made the campus feel small in the best way.",
    },
  ],

  personas: {
    student: {
      label: "Student",
      tagline: "Your whole academic life, one login away.",
      highlights: [
        "Check grades and GWA in real time",
        "Enroll in classes without leaving your seat",
        "Submit assignments and watch lecture recordings",
        "Message any instructor during office hours",
        "Pay tuition and download official receipts",
      ],
    },
    faculty: {
      label: "Faculty",
      tagline: "Less paperwork. More teaching.",
      highlights: [
        "Post grades with bulk-entry tools",
        "See at-risk students flagged automatically",
        "Manage class rosters and attendance",
        "Publish syllabi and lecture recordings",
        "Message your whole class in one click",
      ],
    },
  },

  gettingStarted: {
    title: "Get started in four steps",
    description:
      "Whether you're a freshman or a returning faculty member, DCCPHub has you live in minutes \u2014 not days.",
    steps: [
      {
        stepNumber: 1,
        title: "Create your account",
        description:
          "Register with your DCCP student or faculty ID number. We verify against the registrar so only you get in.",
      },
      {
        stepNumber: 2,
        title: "Verify & sign in",
        description:
          "Confirm via the email on file with the college. Pick a strong password and you're inside the hub.",
      },
      {
        stepNumber: 3,
        title: "Complete your profile",
        description:
          "Add your program, year level, and contact details once. The hub personalizes everything from there.",
      },
      {
        stepNumber: 4,
        title: "Explore your dashboard",
        description:
          "Grades, schedule, courses, messages, and fees are all waiting. Take the 90-second guided tour to learn the ropes.",
      },
    ],
  },

  specs: {
    title: "System requirements & access",
    description:
      "DCCPHub runs in any modern browser \u2014 no installs, no plugins. Here's exactly what you need to get the full experience.",
    groups: [
      {
        category: "Access",
        rows: [
          {
            label: "Sign-in",
            student: "Student ID + password",
            faculty: "Faculty ID + password",
          },
          {
            label: "Recovery",
            student: "Email or registrar visit",
            faculty: "Email or IT office",
          },
        ],
      },
      {
        category: "Devices",
        rows: [
          {
            label: "Desktop",
            student: "Windows, macOS, Linux",
            faculty: "Windows, macOS, Linux",
          },
          {
            label: "Mobile",
            student: "iOS & Android browsers",
            faculty: "iOS & Android browsers",
          },
          {
            label: "Tablet",
            student: "Full touch support",
            faculty: "Full touch support",
          },
        ],
      },
      {
        category: "Browsers",
        rows: [
          {
            label: "Chrome / Edge",
            student: "Last 2 versions",
            faculty: "Last 2 versions",
          },
          {
            label: "Safari / Firefox",
            student: "Last 2 versions",
            faculty: "Last 2 versions",
          },
        ],
      },
      {
        category: "Integrations",
        rows: [
          {
            label: "Payment channels",
            student: "Partnered banks & e-wallets",
            faculty: "\u2014",
          },
          {
            label: "Notifications",
            student: "Email + in-app",
            faculty: "Email + in-app + SMS",
          },
        ],
      },
    ],
  },

  cta: {
    heading: "Your campus, upgraded.",
    subheading:
      "Sign in to DCCPHub today and see why students and faculty are calling it the most useful tool DCCP has ever built.",
    primary: { label: "Sign In", href: `${PORTAL_BASE}/login` },
    secondary: { label: "Create Account", href: registerUrl },
  },
}
