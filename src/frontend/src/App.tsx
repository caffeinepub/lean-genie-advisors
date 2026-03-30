import { AnimatedStatCard } from "@/components/AnimatedStatCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Factory,
  HeartPulse,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Package,
  ShoppingCart,
  Truck,
  UploadCloud,
  Users,
  UtensilsCrossed,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

const STATS = [
  { number: "40%", label: "Faster Processing" },
  { number: "25%", label: "Cost Reduction" },
  { number: "50%", label: "Faster Onboarding" },
  { number: "30%", label: "Higher Utilization" },
];

const LEADER_QUOTES = [
  {
    name: "Jack Welch",
    title: "Former CEO, General Electric",
    quote:
      "Six Sigma is the most important initiative GE has ever undertaken. It is part of the genetic code of our future leadership.",
    company: "General Electric",
    tag: "Manufacturing & Conglomerates",
  },
  {
    name: "Bob Galvin",
    title: "Former CEO, Motorola",
    quote:
      "Six Sigma was the key driver that helped Motorola achieve unprecedented quality levels and save billions of dollars. It changed how we think about business.",
    company: "Motorola",
    tag: "Technology",
  },
  {
    name: "Larry Bossidy",
    title: "Former CEO, AlliedSignal (Honeywell)",
    quote:
      "Lean Six Sigma gives you the tools and discipline to actually execute your strategy — not just talk about it. The results are measurable and real.",
    company: "AlliedSignal / Honeywell",
    tag: "Aerospace & Manufacturing",
  },
  {
    name: "Anne Mulcahy",
    title: "Former CEO, Xerox",
    quote:
      "Process discipline is what separates companies that survive a crisis from those that don't. Six Sigma gave us the language and the framework to fix what was broken.",
    company: "Xerox",
    tag: "Technology & Services",
  },
  {
    name: "Jeff Immelt",
    title: "Former CEO, General Electric",
    quote:
      "Quality is the foundation of everything we build. Six Sigma is how we keep that promise to customers — every time, in every market.",
    company: "General Electric",
    tag: "Leadership",
  },
  {
    name: "Bob Nardelli",
    title: "Former CEO, Home Depot & Chrysler",
    quote:
      "Lean Six Sigma isn't just a quality program — it's a cultural transformation. When you embed it into how people think, the results compound over time.",
    company: "Home Depot / Chrysler",
    tag: "Retail & Automotive",
  },
];

const LSS_COMPANIES = [
  {
    country: "USA",
    flag: "🇺🇸",
    name: "General Electric",
    industry: "Manufacturing & Energy",
    result:
      "Saved over $12 billion in 5 years by embedding Six Sigma across all business units under CEO Jack Welch.",
    highlight: "$12B+ Saved",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "Motorola",
    industry: "Technology",
    result:
      "Originated Six Sigma in the 1980s, reducing defects by 99.9966% and saving $16 billion over 11 years.",
    highlight: "$16B Saved",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "Honeywell",
    industry: "Aerospace & Manufacturing",
    result:
      "Generated over $800 million in savings and improved operational efficiency across all divisions.",
    highlight: "$800M+ Saved",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "3M",
    industry: "Consumer & Industrial",
    result:
      "Adopted Lean Six Sigma to cut product development cycle times and reduce waste, saving hundreds of millions annually.",
    highlight: "Cycle Time ↓ 50%",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "Ford Motor Company",
    industry: "Automotive",
    result:
      "Used Lean Six Sigma to reduce warranty costs by $1 billion and improve production quality across all plants.",
    highlight: "$1B Warranty Savings",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "Amazon",
    industry: "E-Commerce & Logistics",
    result:
      "Applies Lean Six Sigma principles to fulfillment operations, cutting order processing time and reducing errors at scale.",
    highlight: "Fulfillment Speed ↑",
  },
  {
    country: "USA",
    flag: "🇺🇸",
    name: "Caterpillar Inc.",
    industry: "Heavy Equipment",
    result:
      "Saved over $2.4 billion since 2001 through Lean Six Sigma deployment across manufacturing and supply chain.",
    highlight: "$2.4B Saved",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Bombardier",
    industry: "Aerospace & Rail",
    result:
      "Applied Lean Six Sigma to aerospace manufacturing and rail assembly, improving production efficiency and delivery timelines.",
    highlight: "Production Efficiency ↑",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "RBC (Royal Bank of Canada)",
    industry: "Financial Services",
    result:
      "Used Lean Six Sigma in back-office operations to reduce processing times and improve service quality for millions of customers.",
    highlight: "Processing Time ↓",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Scotiabank",
    industry: "Financial Services",
    result:
      "Deployed Lean Six Sigma in loan processing and customer service workflows, reducing cycle times and operational costs.",
    highlight: "Cycle Time ↓ 30%",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Suncor Energy",
    industry: "Oil & Gas",
    result:
      "Applied continuous improvement and Lean Six Sigma principles to refinery operations, improving safety and reducing operational downtime.",
    highlight: "Downtime ↓",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Magna International",
    industry: "Automotive Parts",
    result:
      "Leveraged Lean Six Sigma across global manufacturing operations, significantly reducing defects and improving supplier quality.",
    highlight: "Defects ↓ 40%",
  },
];

const WHY_POINTS = [
  "No-obligation initial consultation",
  "Lean Six Sigma certified methodology",
  "Focused on practical implementation",
  "Local Vancouver business expertise",
];

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Industries", id: "industries" },
  { label: "About", id: "about" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Insights", id: "insights" },
  { label: "Global Impact", id: "companies" },
  { label: "Resources", id: "resources" },
  { label: "Careers", id: "careers" },
  { label: "Book a Call", id: "book" },
];

const FOOTER_NAV = [
  "services",
  "industries",
  "about",
  "case-studies",
  "insights",
  "companies",
  "resources",
  "careers",
  "book",
  "contact",
];

const INDUSTRIES = [
  {
    id: "retail",
    label: "Retail Distribution",
    icon: "ShoppingCart",
    description:
      "Regional distributors and consumer goods companies rely on Lean Genie to streamline fulfillment, reduce motion waste, and scale throughput without adding headcount.",
    caseStudy: {
      metric: "38% throughput increase",
      detail:
        "A 45-person Lower Mainland distributor eliminated picking inefficiencies and reduced labour hours per order by 22% — enabling seasonal scale without new hires.",
    },
  },
  {
    id: "professional",
    label: "Professional Services",
    icon: "Briefcase",
    description:
      "Consulting firms and advisory businesses gain faster project delivery and higher billable utilization through standardized workflows and SOPs.",
    caseStudy: {
      metric: "42% cycle time reduction",
      detail:
        "A 12-person Vancouver firm cut project turnaround nearly in half and boosted billable utilization by 30%.",
    },
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: "Factory",
    description:
      "Light manufacturers reduce defects, cut downtime, and boost output through standardized work, visual controls, and Gemba-driven continuous improvement.",
    caseStudy: {
      metric: "27% production increase",
      detail:
        "A 60-person Fraser Valley manufacturer reduced defects by 35% and machine downtime by 20% using SMED and visual management.",
    },
  },
  {
    id: "hospitality",
    label: "Hospitality",
    icon: "UtensilsCrossed",
    description:
      "Restaurant groups and hospitality operators improve service flow, cut ticket times, and increase per-shift revenue without expanding space.",
    caseStudy: {
      metric: "33% more service capacity",
      detail:
        "A Metro Vancouver restaurant group with 3 locations reduced ticket times by 25% and grew average revenue per shift by 18%.",
    },
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "Package",
    description:
      "Online retailers scale order processing, reduce errors, and handle peak demand smoothly through lean fulfillment workflows.",
    caseStudy: {
      metric: "50% faster order processing",
      detail:
        "A Burnaby apparel brand cut packing errors by 30% and grew daily order capacity by 20% — scaling confidently through peak seasons.",
    },
  },
  {
    id: "trades",
    label: "Trades & Contracting",
    icon: "Wrench",
    description:
      "Electrical, plumbing, and general contractors increase billable hours and job throughput through lean scheduling, scoping, and field reporting.",
    caseStudy: {
      metric: "29% job throughput increase",
      detail:
        "A Surrey electrical contractor with 25 technicians cut rework and callbacks by 22% and added 15% more billable hours per week.",
    },
  },
  {
    id: "food",
    label: "Food Production",
    icon: "ChefHat",
    description:
      "Prepared food producers reduce waste, standardize portioning, and increase daily output through workstation redesign and visual controls.",
    caseStudy: {
      metric: "31% waste reduction",
      detail:
        "A Richmond prepared foods company with 35 staff cut raw material waste by nearly a third and grew production capacity by 28%.",
    },
  },
  {
    id: "logistics",
    label: "Logistics & Delivery",
    icon: "Truck",
    description:
      "Local delivery companies increase daily capacity, reduce overtime, and improve customer satisfaction through standardized routing and dispatch workflows.",
    caseStudy: {
      metric: "33% more deliveries/day",
      detail:
        "An 18-driver Vancouver logistics firm reduced delivery time per route by 26% and overtime by 19% — handling more orders with the same fleet.",
    },
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: "HeartPulse",
    description:
      "Physiotherapy and rehab clinics reduce wait times, balance therapist workloads, and grow appointment capacity without adding staff.",
    caseStudy: {
      metric: "40% wait time reduction",
      detail:
        "A 2-clinic Burnaby physio group with 22 staff cut wait times by 40%, boosted therapist utilization by 24%, and grew daily appointments by 18%.",
    },
  },
  {
    id: "fabrication",
    label: "Custom Fabrication",
    icon: "Layers",
    description:
      "Metal and custom fabrication shops eliminate rework, improve design-to-production handoffs, and increase weekly job throughput.",
    caseStudy: {
      metric: "37% less rework & scrap",
      detail:
        "A 28-person Surrey metal fab shop cut rework by 37% and increased weekly job throughput by 29% through standardized specs and WIP controls.",
    },
  },
];

const FOCUS_AREAS = [
  "Lean Process Optimization",
  "Operational Excellence",
  "Business Innovation",
  "Analytics & Reporting",
];
const TAGS = [
  "Lean Six Sigma",
  "Process Design",
  "Remove Non-Value Added Activities",
  "Improve Profits",
  "Vancouver",
];

const CASE_STUDIES = [
  {
    id: 1,
    industry: "Retail Distribution (Consumer Goods)",
    size: "45 employees",
    location: "Lower Mainland, BC",
    category: "Retail Distribution",
    title: "Increasing Throughput by 38%",
    challenge:
      "A regional distributor struggled with slow order fulfillment, inconsistent picking processes, and rising labour costs. Throughput was capped by manual workflows and unclear task ownership.",
    actions: [
      "Mapped the end to end fulfillment workflow",
      "Introduced standardized picking routes and batch processing",
      "Reduced motion waste and reorganized warehouse layout",
      "Implemented a simple KPI dashboard (OTIF, pick rate, cycle time)",
    ],
    results: [
      "38% increase in daily throughput",
      "22% reduction in labour hours per order",
      "15% increase in gross margin due to improved productivity",
      "Fulfillment errors dropped by 40%",
    ],
    impact:
      "The business gained the capacity to handle seasonal spikes without hiring additional staff, directly improving profitability.",
  },
  {
    id: 2,
    industry: "Professional Services (Consulting & Advisory)",
    size: "12 employees",
    location: "Vancouver, BC",
    category: "Professional Services",
    title: "Cutting Project Cycle Time by 42%",
    challenge:
      "The firm faced long project turnaround times and inconsistent client onboarding. Bottlenecks in handoffs and unclear SOPs created delays and rework.",
    actions: [
      "Conducted a full process mapping workshop",
      "Standardized onboarding and delivery workflows",
      "Introduced SOPs for recurring tasks",
      "Built a KPI dashboard for utilization, cycle time, and workload balance",
    ],
    results: [
      "42% reduction in project cycle time",
      "30% increase in billable utilization",
      "Higher client satisfaction and repeat business",
      "Team workload became more predictable and balanced",
    ],
    impact:
      "The firm increased revenue capacity without expanding headcount, improving profitability and client retention.",
  },
  {
    id: 3,
    industry: "Light Manufacturing",
    size: "60 employees",
    location: "Fraser Valley, BC",
    category: "Manufacturing",
    title: "Boosting Production Throughput by 27%",
    challenge:
      "Production delays, machine downtime, and inconsistent quality checks were limiting output. The team relied on tribal knowledge rather than standardized processes.",
    actions: [
      "Performed a root cause analysis on downtime and defects",
      "Introduced standardized work instructions and visual controls",
      "Implemented a daily Gemba walk and tiered communication",
      "Optimized changeover processes using SMED principles",
    ],
    results: [
      "27% increase in production throughput",
      "35% reduction in defects",
      "20% reduction in machine downtime",
      "Improved operator confidence and consistency",
    ],
    impact:
      "Higher throughput allowed the company to take on new contracts, increasing annual revenue without major capital investment.",
  },
  {
    id: 4,
    industry: "Hospitality (Restaurant Group)",
    size: "3 locations, 80+ staff",
    location: "Metro Vancouver",
    category: "Hospitality",
    title: "Improving Service Capacity by 33%",
    challenge:
      "Long wait times, inconsistent service flow, and inefficient kitchen to table coordination were hurting customer experience and revenue.",
    actions: [
      "Mapped front of house and back of house workflows",
      "Redesigned kitchen layout to reduce motion waste",
      "Standardized prep processes and service sequencing",
      "Introduced a simple performance dashboard (table turns, prep time, ticket time)",
    ],
    results: [
      "33% increase in service capacity during peak hours",
      "18% increase in average revenue per shift",
      "Ticket times reduced by 25%",
      "Staff turnover decreased due to clearer workflows",
    ],
    impact:
      "The business increased throughput and revenue without expanding physical space or hiring additional staff.",
  },
  {
    id: 5,
    industry: "E-Commerce (Apparel)",
    size: "20 employees",
    location: "Burnaby, BC",
    category: "E-Commerce",
    title: "Reducing Order Processing Time by 50%",
    challenge:
      "Order processing was slow and error prone due to manual steps, unclear responsibilities, and lack of real time visibility.",
    actions: [
      "Streamlined order to ship workflow",
      "Introduced batch processing and standardized packing steps",
      "Implemented a lightweight digital tracking board",
      "Reduced unnecessary handoffs and motion waste",
    ],
    results: [
      "50% reduction in order processing time",
      "30% reduction in packing errors",
      "20% increase in daily order capacity",
      "Improved customer satisfaction and repeat purchases",
    ],
    impact:
      "The company scaled operations smoothly during peak seasons without operational chaos.",
  },
  {
    id: 6,
    industry: "Trades (Electrical Contracting)",
    size: "25 technicians",
    location: "Surrey, BC",
    category: "Trades & Contracting",
    title: "Increasing Job Throughput by 29%",
    challenge:
      "Scheduling inefficiencies, unclear job scopes, and inconsistent field reporting caused delays and reduced billable hours.",
    actions: [
      "Standardized job scoping and pre work checklists",
      "Introduced a lean scheduling model to reduce idle time",
      "Built a simple digital reporting workflow",
      "Implemented daily huddles for alignment",
    ],
    results: [
      "29% increase in weekly job throughput",
      "15% increase in billable hours",
      "Reduced rework and callbacks by 22%",
      "Improved technician satisfaction and clarity",
    ],
    impact:
      "Higher throughput directly increased revenue and improved customer response times.",
  },
  {
    id: 7,
    industry: "Food Production (Prepared Foods)",
    size: "35 employees",
    location: "Richmond, BC",
    category: "Food Production",
    title: "Reducing Waste by 31% and Increasing Output Capacity",
    challenge:
      "The production team struggled with inconsistent batch sizes, over portioning, and frequent rework. High material waste and inefficient prep workflows limited daily output.",
    actions: [
      "Conducted a waste analysis across prep, cooking, and packaging",
      "Introduced standardized portioning tools and visual controls",
      "Redesigned workstation layout to reduce motion waste",
      "Implemented a daily performance huddle with simple KPIs",
    ],
    results: [
      "31% reduction in raw material waste",
      "22% increase in employee productivity",
      "28% increase in daily production capacity",
      "Improved product consistency and fewer customer complaints",
    ],
    impact:
      "The business increased throughput and profitability without adding staff or equipment.",
  },
  {
    id: 8,
    industry: "Local Logistics & Delivery",
    size: "18 drivers",
    location: "Vancouver, BC",
    category: "Logistics & Delivery",
    title: "Improving Route Efficiency and Order Capacity",
    challenge:
      "Drivers followed inconsistent routes, paperwork was manual, and dispatching lacked structure. This led to long delivery times, overtime costs, and limited daily order capacity.",
    actions: [
      "Mapped the full dispatch to delivery workflow",
      "Introduced standardized routing logic and batching",
      "Implemented a lightweight digital dispatch board",
      "Reduced administrative waste through simplified reporting",
    ],
    results: [
      "26% reduction in delivery time per route",
      "19% reduction in overtime hours",
      "33% increase in daily delivery capacity",
      "Improved customer satisfaction due to faster service",
    ],
    impact:
      "The company handled more orders per day with the same fleet, directly increasing revenue.",
  },
  {
    id: 9,
    industry: "Health & Wellness (Physiotherapy & Rehab)",
    size: "22 staff across 2 clinics",
    location: "Burnaby, BC",
    category: "Health & Wellness",
    title: "Streamlining Patient Flow and Reducing Idle Time",
    challenge:
      "Patient wait times were long, therapists were overloaded, and front desk staff struggled with scheduling inefficiencies. Idle time and bottlenecks reduced daily appointment capacity.",
    actions: [
      "Analyzed patient flow from check in to discharge",
      "Standardized appointment types and time blocks",
      "Introduced a visual scheduling system to balance workload",
      "Reduced administrative waste through simplified intake forms",
    ],
    results: [
      "40% reduction in patient wait times",
      "24% increase in therapist utilization",
      "18% increase in daily appointment capacity",
      "Higher patient satisfaction and repeat bookings",
    ],
    impact:
      "The clinic increased throughput and revenue without hiring additional therapists.",
  },
  {
    id: 10,
    industry: "Custom Metal Fabrication",
    size: "28 employees",
    location: "Surrey, BC",
    category: "Custom Fabrication",
    title: "Cutting Rework and Increasing Order Throughput",
    challenge:
      "Frequent rework, unclear job specs, and inconsistent handoffs between design and production caused delays and material waste. Throughput was capped by avoidable errors.",
    actions: [
      "Conducted a root cause analysis on rework and scrap",
      "Standardized job specs and introduced pre production checklists",
      "Improved communication between design and fabrication teams",
      "Implemented visual job tracking and WIP limits",
    ],
    results: [
      "37% reduction in rework and scrap",
      "21% increase in employee efficiency",
      "29% increase in weekly job throughput",
      "More predictable delivery timelines",
    ],
    impact:
      "The shop increased profitability by reducing waste and completing more jobs per week.",
  },
];

type CaseStudy = (typeof CASE_STUDIES)[number];

function ExpandableCaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.5 }}
      data-ocid={`case-studies.item.${index + 1}`}
      className="group flex flex-col rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Always-visible header */}
      <div className="p-7 pb-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="inline-block rounded-full bg-aqua-100 px-3 py-1 font-body text-xs font-semibold text-aqua-700">
            {study.category}
          </span>
          <span className="font-body text-xs font-medium text-muted-foreground/60">
            #{study.id.toString().padStart(2, "0")}
          </span>
        </div>
        <h3 className="mb-4 font-display text-xl font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-aqua-700">
          {study.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 font-body text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-aqua-500" />
            {study.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-aqua-500" />
            {study.size}
          </span>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-5 px-7 pb-6">
              <div className="border-t border-border pt-5">
                <h4 className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Challenge
                </h4>
                <p className="font-body text-sm leading-relaxed text-foreground/80">
                  {study.challenge}
                </p>
              </div>

              <div>
                <h4 className="mb-2.5 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What We Did
                </h4>
                <ul className="space-y-2">
                  {study.actions.map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-2.5 font-body text-sm text-foreground/80"
                    >
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aqua-500" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2.5 font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Results
                </h4>
                <ul className="space-y-2">
                  {study.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-2.5 font-body text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-aqua-500" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-aqua-200 bg-gradient-to-br from-aqua-50 to-white p-4">
                <h4 className="mb-1.5 font-body text-xs font-semibold uppercase tracking-wider text-aqua-700">
                  Impact
                </h4>
                <p className="font-body text-sm leading-relaxed text-foreground/80">
                  {study.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div className="mt-auto border-t border-border/60 px-7 py-4">
        <button
          type="button"
          data-ocid={`case-studies.toggle.${index + 1}`}
          onClick={() => setExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between font-body text-sm font-semibold text-aqua-600 transition-colors duration-200 hover:text-aqua-500"
        >
          <span>{expanded ? "Hide Details" : "View Details"}</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  ShoppingCart,
  Briefcase,
  Factory,
  UtensilsCrossed,
  Package,
  Wrench,
  ChefHat,
  Truck,
  HeartPulse,
  Layers,
};

const RESOURCES = [
  {
    number: "01",
    title: "Operational Excellence",
    desc: "Transform your operations with lean principles, process optimization, and continuous improvement methodologies that deliver measurable results.",
    tags: ["Process Redesign", "Waste Elimination", "Quality Management"],
  },
  {
    number: "02",
    title: "Supply Chain Optimization",
    desc: "Build resilient, efficient supply chains that reduce costs, improve delivery performance, and adapt to market dynamics.",
    tags: [
      "Inventory Management",
      "Logistics Optimization",
      "Supplier Development",
    ],
  },
  {
    number: "03",
    title: "Digital Transformation",
    desc: "Leverage AI, automation, and data analytics to modernize your business and create sustainable competitive advantages.",
    tags: ["AI Integration", "Process Automation", "Data Analytics"],
  },
  {
    number: "04",
    title: "Growth Strategy",
    desc: "Develop and execute growth strategies that align your organization, optimize resources, and accelerate market expansion.",
    tags: ["Market Analysis", "Strategic Planning", "Performance Metrics"],
  },
];

function InsightsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % LEADER_QUOTES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + LEADER_QUOTES.length) % LEADER_QUOTES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, next]);

  const quote = LEADER_QUOTES[current];

  return (
    <section
      id="insights"
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/section-insights-bg.dim_1200x600.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/92 via-slate-900/75 to-aqua-900/55" />
      </div>

      <div className="relative z-10 py-24 md:py-32">
        <div className="container">
          {/* Section header */}
          <div className="mb-14 text-center">
            <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-400 md:text-5xl">
              Insights
            </h1>
            <h2 className="mb-4 font-display text-2xl font-semibold text-white mt-2">
              Insights for Leaders
            </h2>
            <p className="mx-auto max-w-xl font-body text-lg text-white/65">
              What global business leaders say about the power of Lean Six
              Sigma.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative mx-auto max-w-4xl min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-6 md:px-16"
                data-ocid="insights.panel"
              >
                {/* Decorative quote mark */}
                <span
                  className="font-serif text-[7rem] leading-none text-aqua-400/40 select-none mb-2"
                  aria-hidden="true"
                >
                  &#8220;
                </span>

                {/* Quote text */}
                <p className="mb-8 font-display text-xl leading-relaxed text-white/90 italic md:text-2xl lg:text-3xl">
                  {quote.quote}
                </p>

                {/* Author */}
                <div className="flex flex-col items-center gap-2">
                  <p className="font-display text-lg font-bold text-white">
                    {quote.name}
                  </p>
                  <p className="font-body text-sm text-white/60">
                    {quote.title}
                  </p>
                  <span className="mt-1 inline-block rounded-full border border-aqua-500/50 bg-aqua-500/15 px-4 py-1.5 font-body text-xs font-semibold text-aqua-300">
                    {quote.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left / Right Arrow Buttons */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous quote"
              data-ocid="insights.pagination_prev"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-aqua-400/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next quote"
              data-ocid="insights.pagination_next"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-aqua-400/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div
            className="mt-10 flex justify-center gap-2.5"
            data-ocid="insights.tab"
          >
            {LEADER_QUOTES.map((q, i) => (
              <button
                key={q.name}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to quote ${i + 1}`}
                data-ocid={`insights.item.${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-aqua-400"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalImpactSection() {
  const [filter, setFilter] = useState<"All" | "Canada" | "USA">("All");
  const filtered =
    filter === "All"
      ? LSS_COMPANIES
      : LSS_COMPANIES.filter((c) => c.country === filter);

  return (
    <section id="companies" className="bg-white py-24 md:py-32">
      {/* Banner image */}
      <div className="relative mb-0 overflow-hidden h-56 md:h-72">
        <img
          src="/assets/generated/section-global-impact.dim_800x500.jpg"
          alt="Global Impact"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-aqua-900/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <h1 className="font-display text-4xl font-bold tracking-tight text-aqua-300 md:text-5xl mb-2">
              Global Impact
            </h1>
            <h2 className="font-display text-2xl font-semibold text-white mt-2">
              Companies Transformed by Lean Six Sigma
            </h2>
          </div>
        </div>
      </div>
      <div className="container pt-12">
        <div className="mb-12">
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl">
            Global Impact
          </h1>
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground mt-2">
            Companies Transformed by Lean Six Sigma
          </h2>
          <p className="max-w-xl font-body text-lg text-muted-foreground">
            Leading organizations across North America have transformed their
            operations with Lean Six Sigma.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-10 flex gap-3 flex-wrap" data-ocid="companies.tab">
          {(["All", "Canada", "USA"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-ocid={`companies.${f.toLowerCase()}.toggle`}
              className={`rounded-full border px-5 py-2 font-body text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? "border-aqua-600 bg-aqua-600 text-white shadow-sm"
                  : "border-aqua-300 bg-white text-aqua-700 hover:border-aqua-500 hover:bg-aqua-50"
              }`}
            >
              {f === "Canada" ? "🇨🇦 Canada" : f === "USA" ? "🇺🇸 USA" : "All"}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              data-ocid={`companies.item.${i + 1}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl">{company.flag}</span>
                <span className="rounded-full bg-aqua-100 px-3 py-1 font-body text-xs font-semibold text-aqua-700">
                  {company.highlight}
                </span>
              </div>
              <h3 className="mb-1 font-display text-xl font-bold text-foreground group-hover:text-aqua-700 transition-colors duration-300">
                {company.name}
              </h3>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {company.industry}
              </p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {company.result}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const anim = useScrollAnimation({ threshold: 0.15 });
  return (
    <section id="resources" className="bg-slate-50 py-24 md:py-32">
      <div className="container">
        <div className="mb-16">
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Resources
          </h1>
          <h2 className="mb-4 font-display text-2xl font-semibold text-muted-foreground mt-2">
            Explore our Resources
          </h2>
          <p className="max-w-2xl font-body text-lg text-muted-foreground">
            Our collection of services spans various needs at every stage of the
            transformation process. Explore how we help businesses transform
            across Metro Vancouver and beyond.
          </p>
        </div>

        {/* Operations feature image */}
        <div className="relative mb-12 overflow-hidden rounded-2xl h-52 md:h-64">
          <img
            src="/assets/generated/section-operations.dim_800x500.jpg"
            alt="Operations"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent rounded-2xl" />
          <div className="absolute inset-0 flex items-center px-8">
            <p className="font-display text-xl font-bold text-white md:text-2xl max-w-lg">
              Transforming operations across Metro Vancouver and beyond
            </p>
          </div>
        </div>

        <div
          ref={anim.ref as React.RefObject<HTMLDivElement>}
          className="grid gap-8 md:grid-cols-2"
        >
          {RESOURCES.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={anim.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="group flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              data-ocid={`resources.item.${i + 1}`}
            >
              <span className="mb-4 font-display text-5xl font-bold text-aqua-100 leading-none select-none">
                {item.number}
              </span>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-aqua-700">
                {item.title}
              </h3>
              <p className="mb-5 font-body leading-relaxed text-muted-foreground flex-1">
                {item.desc}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-aqua-100 px-3 py-1 font-body text-xs font-semibold text-aqua-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-aqua-600 cursor-pointer group-hover:gap-2.5 transition-all duration-300">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [careerForm, setCareerForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    coverNote: "",
  });
  const [careerFile, setCareerFile] = useState<File | null>(null);
  const [careerErrors, setCareerErrors] = useState<Record<string, string>>({});
  const [isSubmittingCareer, setIsSubmittingCareer] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const aboutAnim = useScrollAnimation({ threshold: 0.15 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    if (!actor) {
      toast.error("Please wait for the connection to be established");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.submitContactForm(
        formData.name,
        formData.email,
        formData.company || null,
        formData.message,
      );
      toast.success("Message sent successfully! We'll be in touch soon.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!careerForm.fullName.trim()) errors.fullName = "Full name is required";
    if (!careerForm.phone.trim()) errors.phone = "Phone number is required";
    if (!careerForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(careerForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!careerFile) errors.resume = "Resume is required";
    setCareerErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }
    if (!actor) {
      toast.error("Please wait for the connection to be established");
      return;
    }
    setIsSubmittingCareer(true);
    try {
      const { loadConfig } = await import("./config");
      const { StorageClient } = await import("./utils/StorageClient");
      const { HttpAgent } = await import("@icp-sdk/core/agent");
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey().catch(() => {});
      }
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const fileBytes = new Uint8Array(await careerFile!.arrayBuffer());
      const { hash } = await storageClient.putFile(fileBytes);
      await (actor as any).submitCareerApplication(
        careerForm.fullName,
        careerForm.phone,
        careerForm.email,
        hash,
        careerForm.coverNote.trim() || null,
      );
      toast.success("Application submitted! We'll review it and be in touch.");
      setCareerForm({ fullName: "", phone: "", email: "", coverNote: "" });
      setCareerFile(null);
    } catch (error) {
      console.error("Career submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmittingCareer(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 backdrop-blur-lg">
        <div className="container flex h-18 items-center justify-between py-4">
          <div className="font-display text-xl font-bold tracking-tight">
            <span className="gradient-text">Lean Genie Advisors Inc.</span>
          </div>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollToSection(link.id)}
                className="font-body text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <Button
              data-ocid="nav.contact.button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-6 font-body font-semibold"
            >
              Get in Touch
            </Button>
          </nav>

          <button
            type="button"
            data-ocid="nav.mobile_menu.button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/60 bg-white md:hidden"
            >
              <nav className="container flex flex-col gap-5 py-5">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={`nav.mobile.${link.id}.link`}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left font-body text-base font-medium text-muted-foreground"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  data-ocid="nav.mobile.contact.button"
                  onClick={() => scrollToSection("contact")}
                  className="w-full rounded-full"
                >
                  Get in Touch
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[92vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/generated/hero-network.dim_1400x700.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.06_200/0.88)] via-[oklch(0.14_0.07_195/0.72)] to-[oklch(0.16_0.05_190/0.40)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.04_200/0.60)] via-transparent to-transparent" />
          </div>
          <div className="hero-grid-overlay absolute inset-0 opacity-10" />

          <div className="container relative z-10 flex min-h-[92vh] flex-col justify-center pb-16 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <MapPin className="h-3 w-3 text-aqua-300" />
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-white/80">
                  Lower Mainland, British Columbia
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                Strategic Vision Meets
                <br />
                <span className="hero-accent-text">Operational Excellence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-10 max-w-xl font-body text-lg leading-relaxed text-white/75 md:text-xl"
              >
                Lean Genie Advisors helps Vancouver-based SMBs streamline
                operations, reduce inefficiencies, and build scalable systems
                using Lean Six Sigma and modern business innovation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  data-ocid="hero.cta.primary_button"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group rounded-full bg-aqua-500 px-8 py-3 font-body font-semibold text-white shadow-glow-sm transition-all duration-300 hover:bg-aqua-400 hover:shadow-glow-md"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  data-ocid="hero.cta.secondary_button"
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="rounded-full border-white/30 bg-white/10 px-8 font-body font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
                >
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
                <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-b border-border bg-white">
          <div className="container">
            <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="px-8 py-8 text-center"
                >
                  <div className="font-display text-3xl font-bold text-aqua-600 md:text-4xl">
                    {stat.number}
                  </div>
                  <div className="mt-1 font-body text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 md:py-32">
          <div className="container">
            <div className="mb-16">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl"
              >
                Our Services
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 font-display text-2xl font-semibold text-foreground mt-2"
              >
                What We Deliver
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-xl font-body text-lg text-muted-foreground"
              >
                Structured, implementation-focused advisory designed to remove
                friction, improve flow, and support sustainable growth.
              </motion.p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                image="/assets/generated/service-lean-process.dim_600x400.jpg"
                title="Lean Process Optimization"
                description="Data-driven improvements that eliminate waste, reduce delays, and streamline workflows across your operations."
                delay={0}
              />
              <ServiceCard
                image="/assets/generated/service-ops-excellence.dim_600x400.jpg"
                title="Operational Excellence Systems"
                description="SOPs, process maps, KPIs, and governance frameworks that bring clarity, consistency, and accountability."
                delay={100}
              />
              <ServiceCard
                image="/assets/generated/service-strategy.dim_600x400.jpg"
                title="Business Innovation & Strategy"
                description="Strategic redesigns that strengthen competitiveness, improve customer experience, and unlock new opportunities."
                delay={200}
              />
              <ServiceCard
                image="/assets/generated/service-analytics.dim_600x400.jpg"
                title="Analytics & Decision Support"
                description="Dashboards and reporting systems that turn your data into clear, confident decisions."
                delay={300}
              />
            </div>
          </div>
        </section>

        {/* Growth & Team Banner */}
        <section className="relative overflow-hidden py-0">
          <div className="relative h-[480px] w-full">
            <img
              src="/assets/generated/multicultural-team-growth.dim_1200x675.jpg"
              alt="Multicultural team reviewing business growth charts"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.08_200/0.75)] via-[oklch(0.14_0.07_195/0.45)] to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-xl text-white">
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-300">
                    Our Impact
                  </p>
                  <h2 className="mb-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                    Driving Growth Across Every Engagement
                  </h2>
                  <p className="font-body text-base leading-relaxed text-white/80">
                    Our diverse team of experts partners with your organization
                    to deliver measurable, lasting results -- backed by data and
                    driven by collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Industries We Serve */}
        <section id="industries" className="bg-slate-50 py-24 md:py-32">
          <div className="container">
            <div className="mb-12">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl"
              >
                Our Reach
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 font-display text-2xl font-semibold text-foreground mt-2"
              >
                Industries We Serve
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-xl font-body text-lg text-muted-foreground"
              >
                Lean Genie has delivered measurable results across a wide range
                of industries — each with unique challenges, all solved through
                the same disciplined approach.
              </motion.p>
            </div>

            <Tabs defaultValue="retail" className="w-full">
              {/* Mobile: horizontal scroll tabs */}
              <div className="mb-8 lg:hidden">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
                    {INDUSTRIES.map((industry) => {
                      const Icon = INDUSTRY_ICONS[industry.icon];
                      return (
                        <TabsTrigger
                          key={industry.id}
                          value={industry.id}
                          data-ocid={`industries.${industry.id}.tab`}
                          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 font-body text-sm font-medium text-muted-foreground shadow-sm transition-all data-[state=active]:border-aqua-400 data-[state=active]:bg-aqua-50 data-[state=active]:text-aqua-700"
                        >
                          {Icon && <Icon className="h-3.5 w-3.5" />}
                          {industry.label}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              </div>

              {/* Desktop: sidebar layout */}
              <div className="hidden lg:grid lg:grid-cols-[260px,1fr] lg:gap-8">
                <TabsList className="flex h-auto flex-col gap-1 bg-transparent p-0">
                  {INDUSTRIES.map((industry) => {
                    const Icon = INDUSTRY_ICONS[industry.icon];
                    return (
                      <TabsTrigger
                        key={industry.id}
                        value={industry.id}
                        data-ocid={`industries.${industry.id}.tab`}
                        className="flex w-full items-center gap-3 rounded-xl border border-transparent bg-white px-4 py-3 text-left font-body text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-aqua-200 hover:bg-aqua-50/50 hover:text-aqua-700 data-[state=active]:border-aqua-400 data-[state=active]:bg-aqua-50 data-[state=active]:text-aqua-700 data-[state=active]:shadow-md"
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                        <span>{industry.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <div>
                  {INDUSTRIES.map((industry) => (
                    <TabsContent
                      key={industry.id}
                      value={industry.id}
                      className="mt-0"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-2xl border border-border bg-white p-8 shadow-sm"
                      >
                        <h3 className="mb-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                          {industry.label}
                        </h3>
                        <p className="mb-8 font-body text-lg leading-relaxed text-muted-foreground">
                          {industry.description}
                        </p>

                        <div className="rounded-xl border border-aqua-200 bg-gradient-to-br from-aqua-50 to-white p-6">
                          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                            Case Study Highlight
                          </p>
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-aqua-500 px-4 py-1.5">
                            <span className="font-display text-sm font-bold text-white">
                              {industry.caseStudy.metric}
                            </span>
                          </div>
                          <p className="font-body leading-relaxed text-slate-700">
                            {industry.caseStudy.detail}
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>
                  ))}
                </div>
              </div>

              {/* Mobile tab content */}
              <div className="lg:hidden">
                {INDUSTRIES.map((industry) => (
                  <TabsContent
                    key={industry.id}
                    value={industry.id}
                    className="mt-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                    >
                      <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                        {industry.label}
                      </h3>
                      <p className="mb-6 font-body leading-relaxed text-muted-foreground">
                        {industry.description}
                      </p>
                      <div className="rounded-xl border border-aqua-200 bg-gradient-to-br from-aqua-50 to-white p-5">
                        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                          Case Study Highlight
                        </p>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-aqua-500 px-4 py-1.5">
                          <span className="font-display text-sm font-bold text-white">
                            {industry.caseStudy.metric}
                          </span>
                        </div>
                        <p className="font-body text-sm leading-relaxed text-slate-700">
                          {industry.caseStudy.detail}
                        </p>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="overflow-hidden bg-slate-950 py-24 text-white md:py-32"
        >
          <div className="container">
            <div
              ref={aboutAnim.ref as React.RefObject<HTMLDivElement>}
              className="grid gap-16 lg:grid-cols-[1.4fr,1fr]"
            >
              <div>
                <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-400 md:text-5xl">
                  About Us
                </h1>
                <h2 className="mb-8 font-display text-2xl font-semibold text-white mt-2">
                  A Partner in
                  <br />
                  <span className="text-aqua-400">Performance</span>
                </h2>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  Lean Genie Advisors is a Vancouver-based consulting practice
                  focused on helping small and mid-sized businesses operate with
                  enterprise-level discipline.
                </p>
                <p className="mb-5 font-body leading-relaxed text-white/60">
                  Our approach blends Lean Six Sigma rigor with modern
                  innovation frameworks to deliver measurable, sustainable
                  improvements. We focus on practical implementation, not just
                  recommendations on paper.
                </p>
                <p className="font-body leading-relaxed text-white/60">
                  Whether you are refining existing operations or building new
                  capabilities, we work alongside your team to design, test, and
                  embed better ways of working.
                </p>

                {/* Mission Statement */}
                <div className="mt-10 rounded-xl border border-aqua-500/20 bg-aqua-500/10 p-6">
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-aqua-400">
                    Our Mission
                  </p>
                  <p className="font-body text-lg italic leading-relaxed text-white/90">
                    "We exist to help small and mid-sized businesses operate
                    with the discipline and efficiency of enterprise-level
                    organizations — without the overhead."
                  </p>
                </div>

                {/* Core Values */}
                <div className="mt-10">
                  <p className="mb-5 font-body text-xs font-semibold uppercase tracking-widest text-aqua-400">
                    Core Values
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        title: "Practical First",
                        desc: "We deliver implementations, not just reports. Every recommendation comes with a clear path to execution.",
                      },
                      {
                        title: "Results Driven",
                        desc: "We measure success by your numbers: throughput, margins, cycle times. Not by activity or deliverables.",
                      },
                      {
                        title: "People Centered",
                        desc: "Sustainable improvement requires your team's buy-in. We design with your people, not around them.",
                      },
                    ].map((value) => (
                      <div
                        key={value.title}
                        className="rounded-xl border border-white/10 bg-white/5 p-5"
                      >
                        <h4 className="mb-2 font-display text-sm font-bold text-aqua-300">
                          {value.title}
                        </h4>
                        <p className="font-body text-xs leading-relaxed text-white/60">
                          {value.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Founding Story */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-aqua-400">
                    Our Story
                  </p>
                  <p className="font-body text-sm leading-relaxed text-white/65">
                    Lean Genie Advisors was founded in Vancouver, BC, by
                    operations leaders who saw a gap: SMBs were left behind by
                    consulting firms that favored large enterprise clients. We
                    built a practice specifically for growing businesses that
                    need real-world operational expertise without the big-firm
                    price tag.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-aqua-500/30 bg-aqua-500/10 px-4 py-1.5 font-body text-sm font-medium text-aqua-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    data-ocid="about.cta.primary_button"
                    onClick={() => scrollToSection("book")}
                    className="rounded-full bg-aqua-500 px-8 font-body font-semibold text-white hover:bg-aqua-400"
                  >
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 overflow-hidden rounded-2xl">
                <img
                  src="/assets/generated/section-about-bg.dim_900x500.jpg"
                  alt="Network operations"
                  className="h-48 w-full object-cover object-center md:h-56"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "20+",
                    title: "Transformations Delivered",
                    desc: "Successful projects across diverse industries",
                  },
                  {
                    value: "$2M+",
                    title: "Value Created",
                    desc: "Measurable impact for our clients",
                  },
                  {
                    value: "15+",
                    title: "Years of Excellence",
                    desc: "Deep expertise in lean methodologies",
                  },
                  {
                    value: "99%",
                    title: "Client Satisfaction",
                    desc: "Consistent delivery of exceptional results",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="mb-1 font-display text-3xl font-bold text-aqua-400">
                      {stat.value}
                    </div>
                    <div className="mb-1 font-semibold text-white">
                      {stat.title}
                    </div>
                    <div className="text-xs text-white/60">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: "Results-Driven",
                    desc: "Every engagement is measured by tangible outcomes and lasting impact.",
                  },
                  {
                    title: "Collaborative",
                    desc: "We work alongside your teams, building capabilities that endure.",
                  },
                  {
                    title: "Innovative",
                    desc: "Combining proven methodologies with cutting-edge technology solutions.",
                  },
                  {
                    title: "Excellence",
                    desc: "Committed to the highest standards in everything we do.",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="mb-2 h-2 w-2 rounded-full bg-aqua-400" />
                    <div className="mb-1 font-display text-sm font-bold text-aqua-300">
                      {card.title}
                    </div>
                    <div className="text-xs text-white/60">{card.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="py-24 md:py-32">
          <div className="container">
            <div className="mb-16">
              <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl">
                Case Studies
              </h1>
              <h2 className="mb-4 font-display text-2xl font-semibold text-foreground mt-2">
                Impact in Action
              </h2>
              <p className="max-w-xl font-body text-lg text-muted-foreground">
                Examples of how structured, lean-focused improvements translate
                into measurable business results.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {CASE_STUDIES.map((study, index) => (
                <ExpandableCaseStudyCard
                  key={study.id}
                  study={study}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Insights - Hero Carousel */}
        <InsightsCarousel />

        {/* Global Impact - Companies */}
        <GlobalImpactSection />

        {/* Resources */}
        <ResourcesSection />

        {/* Careers */}
        <section id="careers" className="bg-slate-50 py-24 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-14">
              <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl">
                Join the Team
              </h1>
              <h2 className="mb-5 font-display text-2xl font-semibold text-foreground mt-2">
                Join Our Team
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                We're always looking for sharp, driven people who want to make a
                measurable difference in how businesses operate.
              </p>
            </div>
            <div className="mx-auto max-w-2xl">
              <form
                data-ocid="careers.form"
                onSubmit={handleCareerSubmit}
                className="rounded-2xl border border-border bg-white p-8 shadow-sm"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="career-name"
                      className="font-body font-medium"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="career-name"
                      data-ocid="careers.name.input"
                      placeholder="Jane Doe"
                      value={careerForm.fullName}
                      onChange={(e) => {
                        setCareerForm((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }));
                        setCareerErrors((p) => ({ ...p, fullName: "" }));
                      }}
                      className={`rounded-lg font-body ${careerErrors.fullName ? "border-destructive" : ""}`}
                    />
                    {careerErrors.fullName && (
                      <p
                        data-ocid="careers.name.error_state"
                        className="font-body text-xs text-destructive"
                      >
                        {careerErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="career-phone"
                      className="font-body font-medium"
                    >
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="career-phone"
                      data-ocid="careers.phone.input"
                      placeholder="+1 (604) 555-0100"
                      value={careerForm.phone}
                      onChange={(e) => {
                        setCareerForm((p) => ({ ...p, phone: e.target.value }));
                        setCareerErrors((p) => ({ ...p, phone: "" }));
                      }}
                      className={`rounded-lg font-body ${careerErrors.phone ? "border-destructive" : ""}`}
                    />
                    {careerErrors.phone && (
                      <p
                        data-ocid="careers.phone.error_state"
                        className="font-body text-xs text-destructive"
                      >
                        {careerErrors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <Label
                    htmlFor="career-email"
                    className="font-body font-medium"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="career-email"
                    data-ocid="careers.email.input"
                    type="email"
                    placeholder="jane@example.com"
                    value={careerForm.email}
                    onChange={(e) => {
                      setCareerForm((p) => ({ ...p, email: e.target.value }));
                      setCareerErrors((p) => ({ ...p, email: "" }));
                    }}
                    className={`rounded-lg font-body ${careerErrors.email ? "border-destructive" : ""}`}
                  />
                  {careerErrors.email && (
                    <p
                      data-ocid="careers.email.error_state"
                      className="font-body text-xs text-destructive"
                    >
                      {careerErrors.email}
                    </p>
                  )}
                </div>
                <div className="mt-5 space-y-2">
                  <Label className="font-body font-medium">
                    Resume <span className="text-destructive">*</span>
                  </Label>
                  <label
                    data-ocid="careers.resume.upload_button"
                    className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-6 transition-colors hover:bg-aqua-50 ${careerErrors.resume ? "border-destructive" : "border-border hover:border-aqua-400"}`}
                  >
                    <UploadCloud
                      className={`h-8 w-8 ${careerErrors.resume ? "text-destructive" : "text-aqua-400"}`}
                    />
                    {careerFile ? (
                      <span className="font-body text-sm font-medium text-foreground">
                        {careerFile.name}
                      </span>
                    ) : (
                      <span className="font-body text-sm text-muted-foreground">
                        Click to upload your resume (.pdf or .docx)
                      </span>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setCareerFile(f);
                        setCareerErrors((p) => ({ ...p, resume: "" }));
                      }}
                    />
                  </label>
                  {careerErrors.resume && (
                    <p
                      data-ocid="careers.resume.error_state"
                      className="font-body text-xs text-destructive"
                    >
                      {careerErrors.resume}
                    </p>
                  )}
                </div>
                <div className="mt-5 space-y-2">
                  <Label
                    htmlFor="career-cover"
                    className="font-body font-medium"
                  >
                    Cover Note{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="career-cover"
                    data-ocid="careers.cover.textarea"
                    placeholder="Tell us a little about yourself and why you'd like to work with Lean Genie..."
                    rows={4}
                    value={careerForm.coverNote}
                    onChange={(e) =>
                      setCareerForm((p) => ({
                        ...p,
                        coverNote: e.target.value,
                      }))
                    }
                    className="rounded-lg font-body resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="careers.submit_button"
                  size="lg"
                  disabled={isSubmittingCareer}
                  className="mt-6 w-full rounded-full font-body font-semibold sm:w-auto"
                >
                  {isSubmittingCareer ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Book a Meeting */}
        <section id="book" className="bg-white py-24 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl">
                Schedule a Call
              </h1>
              <h2 className="mb-4 font-display text-2xl font-semibold text-foreground mt-2">
                Book a Free 30-Min Consultation
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Pick a time that works for you and let's talk about how we can
                improve your operations.
              </p>
            </div>
            <div
              className="calendly-inline-widget mx-auto rounded-2xl overflow-hidden shadow-sm border border-border"
              data-url="https://calendly.com/leangenieadvisors-info/30min"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container">
            {/* Contact Info Cards */}
            <div className="mb-16 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: <Mail className="h-5 w-5 text-aqua-600" />,
                  title: "Email Us",
                  detail: "info@leangenieadvisors.ca",
                  action: null,
                },
                {
                  icon: <MapPin className="h-5 w-5 text-aqua-600" />,
                  title: "Visit Us",
                  detail: "Delta, British Columbia, Canada",
                  action: null,
                },
                {
                  icon: <CalendarCheck className="h-5 w-5 text-aqua-600" />,
                  title: "Book a Call",
                  detail: "Schedule a free 30-min consultation",
                  action: "book",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-100">
                    {card.icon}
                  </div>
                  <div>
                    <p className="mb-1 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                      {card.title}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {card.detail}
                    </p>
                  </div>
                  {card.action && (
                    <Button
                      data-ocid="contact.book_call.button"
                      variant="outline"
                      size="sm"
                      onClick={() => scrollToSection(card.action!)}
                      className="mt-auto rounded-full border-aqua-300 font-body text-aqua-700 hover:bg-aqua-50"
                    >
                      Schedule Now
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-16 lg:grid-cols-[1.4fr,1fr]">
              <div>
                <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-aqua-600 md:text-5xl">
                  Get In Touch
                </h1>
                <h2 className="mb-6 font-display text-2xl font-semibold text-foreground mt-2">
                  Let's Build a Better Operation
                </h2>
                <p className="mb-10 font-body text-lg text-muted-foreground">
                  Share a bit about your business and current challenges. We'll
                  follow up with a focused, no-obligation conversation.
                </p>

                <form
                  onSubmit={handleSubmit}
                  data-ocid="contact.form"
                  className="rounded-2xl border border-border bg-white p-8 shadow-sm"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        data-ocid="contact.name.input"
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`rounded-lg font-body ${
                          formErrors.name ? "border-destructive" : ""
                        }`}
                      />
                      {formErrors.name && (
                        <p
                          data-ocid="contact.name.error_state"
                          className="font-body text-xs text-destructive"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        data-ocid="contact.email.input"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`rounded-lg font-body ${
                          formErrors.email ? "border-destructive" : ""
                        }`}
                      />
                      {formErrors.email && (
                        <p
                          data-ocid="contact.email.error_state"
                          className="font-body text-xs text-destructive"
                        >
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <Label htmlFor="company" className="font-body font-medium">
                      Company{" "}
                      <span className="font-normal text-muted-foreground">
                        (Optional)
                      </span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      data-ocid="contact.company.input"
                      type="text"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="rounded-lg font-body"
                    />
                  </div>

                  <div className="mt-5 space-y-2">
                    <Label htmlFor="message" className="font-body font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      data-ocid="contact.message.textarea"
                      placeholder="Tell us about your goals or current challenges..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`rounded-lg font-body ${
                        formErrors.message ? "border-destructive" : ""
                      }`}
                    />
                    {formErrors.message && (
                      <p
                        data-ocid="contact.message.error_state"
                        className="font-body text-xs text-destructive"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-full font-body font-semibold sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                  <h3 className="mb-6 font-display text-xl font-bold text-white">
                    Contact Details
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-aqua-500/20">
                        <MapPin className="h-4 w-4 text-aqua-400" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                          Location
                        </p>
                        <p className="font-body text-white/85">
                          Vancouver, British Columbia, Canada
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-aqua-500/20">
                        <Mail className="h-4 w-4 text-aqua-400" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                          Email
                        </p>
                        <p className="font-body text-white/85">
                          info@leangenieadvisors.ca
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-aqua-500/20">
                        <Clock className="h-4 w-4 text-aqua-400" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                          Hours
                        </p>
                        <p className="font-body text-white/85">
                          Monday – Friday
                          <br />
                          8:00 AM – 7:00 PM PST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-aqua-200 bg-gradient-to-br from-aqua-50 to-white p-7">
                  <h4 className="mb-3 font-display text-lg font-bold text-foreground">
                    Why Lean Genie?
                  </h4>
                  <ul className="space-y-2.5">
                    {WHY_POINTS.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-aqua-500 font-bold text-[10px] text-white">
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 pb-8 pt-16 text-white">
        <div className="container">
          <div className="mb-12 grid gap-10 md:grid-cols-[1.6fr,1fr,1fr]">
            <div>
              <div className="mb-4 font-display text-xl font-bold">
                <span className="text-aqua-400">Lean Genie</span>{" "}
                <span className="text-white">Advisors</span>
              </div>
              <p className="max-w-xs font-body text-sm leading-relaxed text-white/50">
                Operational excellence, lean systems, and practical innovation
                for modern Vancouver businesses.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                Navigation
              </h3>
              <ul className="space-y-3 font-body text-sm text-white/60">
                {FOOTER_NAV.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      data-ocid={`footer.${id}.link`}
                      onClick={() => scrollToSection(id)}
                      className="capitalize transition-colors duration-200 hover:text-aqua-400"
                    >
                      {id.replace("-", " ")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                Focus Areas
              </h3>
              <ul className="space-y-3 font-body text-sm text-white/60">
                {FOCUS_AREAS.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="font-body text-sm text-white/35">
              <a
                href="https://www.linkedin.com/company/lean-genie-advisors-inc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-white/50 transition-colors hover:text-aqua-400"
              >
                <Linkedin size={18} />
              </a>
            </p>
            <p className="font-body text-sm text-white/35">
              © {new Date().getFullYear()} Lean Genie Advisors. All rights
              reserved. · Vancouver, BC, Canada.
            </p>
            <p className="font-body text-sm text-white/35">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-aqua-400 transition-colors hover:text-aqua-300"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
