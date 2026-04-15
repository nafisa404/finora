import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BotMessageSquare,
  LineChart,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Expense Tracking",
    description:
      "Log and categorize transactions in seconds. Automatic breakdowns give you instant clarity on where your money goes.",
    badge: "Core",
    badgeVariant: "secondary" as const,
  },
  {
    icon: ShieldAlert,
    title: "Smart Anomaly Alerts",
    description:
      "Rule-based detection flags unusual spending the moment it happens — overspending, category spikes, and more.",
    badge: "Intelligent",
    badgeVariant: "destructive" as const,
  },
  {
    icon: BotMessageSquare,
    title: "AI Financial Assistant",
    description:
      "Chat with your personal AI advisor for personalized insights, budgeting tips, and financial guidance.",
    badge: "AI-Powered",
    badgeVariant: "default" as const,
  },
];

const STATS = [
  { label: "Avg. monthly savings", value: "$1,240", icon: Wallet },
  { label: "Expense categories tracked", value: "12+", icon: LineChart },
  { label: "Alerts generated/month", value: "3–8", icon: Bell },
  { label: "Insights per week", value: "5+", icon: Sparkles },
];

const TESTIMONIALS = [
  {
    quote: "Finora helped me cut dining expenses by 30% in one month.",
    name: "Sarah K.",
    role: "Freelance Designer",
  },
  {
    quote:
      "The anomaly detection caught a subscription I forgot about. Saved me instantly.",
    name: "Marcus T.",
    role: "Software Engineer",
  },
  {
    quote:
      "Finally a finance app that doesn't feel overwhelming. Clean and intelligent.",
    name: "Priya N.",
    role: "Product Manager",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground select-none">
            Finora
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#insights"
              className="hover:text-foreground transition-colors"
            >
              Insights
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                data-ocid="landing.login_button"
              >
                Log in
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="sm"
                className="gap-1.5"
                data-ocid="landing.get_started_nav_button"
              >
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-background pt-16 pb-0 px-4 md:px-8"
        data-ocid="landing.hero_section"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.52 0.19 246 / 0.07), transparent)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="secondary"
              className="mb-4 text-xs px-3 py-1 rounded-full font-body"
            >
              <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
              AI-powered personal finance
            </Badge>
            <h1 className="font-display text-[3.25rem] md:text-[4.5rem] lg:text-[5.25rem] font-semibold tracking-tight text-foreground leading-[1.03]">
              Your Smart
              <br />
              <span className="text-primary">Financial</span> Companion
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Track every dollar, detect unusual spending automatically, and get
            AI-powered guidance — in one beautifully simple dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Link to="/dashboard">
              <Button
                size="lg"
                className="gap-2 px-7 text-base shadow-card-hover"
                data-ocid="landing.hero_cta"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-base text-muted-foreground"
                data-ocid="landing.hero_demo_button"
              >
                View Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1"
          >
            <div className="flex -space-x-1.5">
              {[
                { cls: "bg-primary/80", id: "a1" },
                { cls: "bg-accent/80", id: "a2" },
                { cls: "bg-primary/60", id: "a3" },
              ].map(({ cls, id }) => (
                <div
                  key={id}
                  className={`h-6 w-6 rounded-full border-2 border-background ${cls}`}
                />
              ))}
            </div>
            <span>Join 2,400+ people managing finances smarter</span>
          </motion.div>
        </div>

        {/* Dashboard screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl mx-auto mt-12 px-0 md:px-4"
        >
          <div
            className="rounded-t-2xl border border-border shadow-card-hover overflow-hidden"
            style={{
              boxShadow:
                "0 4px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Window chrome */}
            <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/50" />
                <span className="h-3 w-3 rounded-full bg-accent/50" />
                <span className="h-3 w-3 rounded-full bg-primary/40" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 max-w-xs mx-auto rounded-full bg-muted/70 flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">
                    finora.app/dashboard
                  </span>
                </div>
              </div>
            </div>
            <img
              src="/assets/generated/dashboard-preview.dim_1200x750.png"
              alt="Finora Dashboard Preview"
              className="w-full object-cover object-top"
              style={{ maxHeight: "440px" }}
            />
          </div>
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(var(--background)))",
            }}
          />
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="bg-background border-y border-border py-10 px-4 md:px-8 mt-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="text-center space-y-1"
            >
              <s.icon className="h-4 w-4 text-primary mx-auto mb-2 opacity-70" />
              <div className="font-display text-2xl font-semibold text-foreground">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-muted/20 py-20 px-4 md:px-8"
        data-ocid="landing.features_section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-14 space-y-3"
          >
            <p className="text-xs font-medium text-primary uppercase tracking-widest">
              Features
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Everything you need to stay on track
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Finora brings together the tools smart finance management requires
              — without the clutter.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group bg-card rounded-2xl border border-border shadow-card p-7 space-y-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-smooth"
                data-ocid={`landing.feature_card.${i + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center group-hover:bg-primary/12 transition-smooth">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant={feature.badgeVariant}
                    className="text-[10px] rounded-full"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground text-base">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Anomaly highlight section */}
      <section
        id="insights"
        className="bg-background py-20 px-4 md:px-8"
        data-ocid="landing.anomaly_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <p className="text-xs font-medium text-destructive uppercase tracking-widest">
                Anomaly Detection
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-snug">
                Know the moment something feels off
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our rule-based engine watches every transaction. If dining
                spikes 30%, if a single expense doubles your average, or if your
                daily spend exceeds your limit — you'll know immediately.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    icon: TrendingUp,
                    text: "Expense 2× above average → flagged instantly",
                  },
                  {
                    icon: TrendingDown,
                    text: "Category spend up 30%+ → category alert",
                  },
                  {
                    icon: Bell,
                    text: "Daily limit exceeded → overspend warning",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3 w-3 text-destructive" />
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="landing.anomaly_cta"
                >
                  See it in action <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Mock alert cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3"
            >
              {[
                {
                  level: "critical" as const,
                  title: "Unusual high expense detected",
                  desc: "Dining expense of $185 is 2.4× your average ($77)",
                  time: "Just now",
                },
                {
                  level: "warning" as const,
                  title: "Food category spike",
                  desc: "Your food spending increased 38% this week vs. last week",
                  time: "2h ago",
                },
                {
                  level: "info" as const,
                  title: "Daily spending limit reached",
                  desc: "You've exceeded your $200/day limit. Total today: $247",
                  time: "5h ago",
                },
              ].map((alert, i) => (
                <motion.div
                  key={alert.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="bg-card rounded-xl border border-border shadow-card p-4 flex gap-3 items-start"
                  data-ocid={`landing.alert_preview.${i + 1}`}
                >
                  <div
                    className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      alert.level === "critical"
                        ? "bg-destructive/10"
                        : alert.level === "warning"
                          ? "bg-accent/10"
                          : "bg-primary/10"
                    }`}
                  >
                    <Bell
                      className={`h-4 w-4 ${
                        alert.level === "critical"
                          ? "text-destructive"
                          : alert.level === "warning"
                            ? "text-accent"
                            : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {alert.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alert.desc}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.level === "critical"
                        ? "destructive"
                        : alert.level === "warning"
                          ? "secondary"
                          : "default"
                    }
                    className="text-[10px] rounded-full flex-shrink-0"
                  >
                    {alert.level === "critical"
                      ? "Critical"
                      : alert.level === "warning"
                        ? "Warning"
                        : "Info"}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/20 py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 space-y-2"
          >
            <p className="text-xs font-medium text-primary uppercase tracking-widest">
              Testimonials
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Loved by people who take finances seriously
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-4"
                data-ocid={`landing.testimonial.${i + 1}`}
              >
                <p className="text-sm text-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 pt-1 border-t border-border">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="bg-background py-24 px-4 md:px-8 border-t border-border text-center"
        data-ocid="landing.final_cta_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto space-y-6"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Start taking control of your finances today
          </h2>
          <p className="text-muted-foreground">
            No setup required. Dive into your dashboard and start tracking in
            seconds.
          </p>
          <Link to="/dashboard">
            <Button
              size="lg"
              className="gap-2 px-8 text-base shadow-card-hover"
              data-ocid="landing.final_cta_button"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold text-foreground">
            Finora
          </span>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#insights"
              className="hover:text-foreground transition-colors"
            >
              Insights
            </a>
            <Link
              to="/dashboard"
              className="hover:text-foreground transition-colors"
              data-ocid="landing.footer_dashboard_link"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
