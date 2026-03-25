import { AnimatedStatCard } from "@/components/AnimatedStatCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const STATS = [
  { number: "40%", label: "Faster Processing" },
  { number: "25%", label: "Cost Reduction" },
  { number: "50%", label: "Faster Onboarding" },
  { number: "30%", label: "Higher Utilization" },
];

const INSIGHTS = [
  {
    tag: "Operations",
    title: "The SMB Advantage: Lean Thinking at Scale",
    desc: "Why smaller organizations can outperform larger competitors by embracing lean, focused, and disciplined operations.",
  },
  {
    tag: "Innovation",
    title: "Designing Processes That Enable Innovation",
    desc: "How clear systems and structure create the space for creativity, experimentation, and sustainable growth.",
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
  { label: "About", id: "about" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Insights", id: "insights" },
];

const FOOTER_NAV = ["services", "about", "case-studies", "insights", "contact"];
const FOCUS_AREAS = [
  "Lean Process Optimization",
  "Operational Excellence",
  "Business Innovation",
  "Analytics & Reporting",
];
const TAGS = [
  "Lean Six Sigma",
  "Process Design",
  "SMB Focus",
  "Hands-On",
  "Vancouver",
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { actor } = useActor();

  const insightsAnim = useScrollAnimation({ threshold: 0.15 });
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
            <span className="gradient-text">Lean Genie Advisors</span>
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
              src="/assets/generated/hero-consulting.dim_1200x700.jpg"
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
                  Vancouver · Operational Excellence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                Operational
                <br />
                <span className="hero-accent-text">Excellence</span>
                <br />
                for the Modern
                <br />
                Business
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
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600"
              >
                Our Services
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
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
                gradientFallback
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
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-400">
                  About Us
                </p>
                <h2 className="mb-8 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AnimatedStatCard
                  label="Focus"
                  value="SMB Operations"
                  delay={0}
                  dark
                />
                <AnimatedStatCard
                  label="Approach"
                  value="Lean Six Sigma"
                  delay={100}
                  dark
                />
                <AnimatedStatCard
                  label="Location"
                  value="Vancouver, BC"
                  delay={200}
                  dark
                />
                <AnimatedStatCard
                  label="Engagement Style"
                  value="Hands-On Advisory"
                  delay={300}
                  dark
                />
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="py-24 md:py-32">
          <div className="container">
            <div className="mb-16">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                Case Studies
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Impact in Action
              </h2>
              <p className="max-w-xl font-body text-lg text-muted-foreground">
                Examples of how structured, lean-focused improvements translate
                into measurable business results.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <CaseStudyCard
                image="/assets/generated/case-retail.dim_700x450.jpg"
                category="Retail Operations"
                title="Retail Operations Transformation"
                description={[
                  "A regional retailer faced long order processing times, inconsistent workflows, and rising operating costs.",
                  "We mapped key processes, removed bottlenecks, and implemented lean workflows with clear KPIs.",
                ]}
                results={[
                  "40% faster order processing",
                  "25% reduction in operating costs",
                  "Improved team visibility and accountability",
                ]}
                delay={0}
              />
              <CaseStudyCard
                image="/assets/generated/case-professional.dim_700x450.jpg"
                category="Professional Services"
                title="Professional Services Optimization"
                description={[
                  "A growing services firm struggled with inconsistent onboarding and uneven project delivery.",
                  "We introduced standardized SOPs, clarified roles, and automated key reporting steps.",
                ]}
                results={[
                  "30% increase in utilization",
                  "50% faster client onboarding",
                  "More predictable delivery timelines",
                ]}
                delay={150}
              />
            </div>
          </div>
        </section>

        {/* Insights */}
        <section id="insights" className="bg-slate-50 py-24 md:py-32">
          <div className="container">
            <div className="mb-16">
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                Insights
              </p>
              <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Insights for Leaders
              </h2>
              <p className="max-w-xl font-body text-lg text-muted-foreground">
                Perspectives on how operational discipline and thoughtful design
                can support modern, growing businesses.
              </p>
            </div>

            <div
              ref={insightsAnim.ref as React.RefObject<HTMLDivElement>}
              className="grid gap-8 md:grid-cols-2"
            >
              {INSIGHTS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={insightsAnim.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-gradient-to-bl from-aqua-100 to-transparent" />
                  <span className="mb-4 inline-block rounded-full bg-aqua-100 px-3 py-1 font-body text-xs font-semibold text-aqua-700">
                    {item.tag}
                  </span>
                  <h3 className="mb-3 font-display text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-aqua-700">
                    {item.title}
                  </h3>
                  <p className="mb-6 font-body leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-aqua-600">
                    Coming soon <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-[1.4fr,1fr]">
              <div>
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                  Get In Touch
                </p>
                <h2 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
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
                        className={`rounded-lg font-body ${formErrors.name ? "border-destructive" : ""}`}
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
                        className={`rounded-lg font-body ${formErrors.email ? "border-destructive" : ""}`}
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
                      className={`rounded-lg font-body ${formErrors.message ? "border-destructive" : ""}`}
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
                          contact@leangenie.ca
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
                          9:00 AM – 6:00 PM PST
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
