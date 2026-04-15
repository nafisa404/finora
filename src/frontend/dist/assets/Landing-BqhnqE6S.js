import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, a as Badge, b as Bell } from "./index-CR1PEJiH.js";
import { A as ArrowRight } from "./arrow-right-DN2aAq7Y.js";
import { m as motion } from "./proxy-DBJZ538-.js";
import { S as Sparkles } from "./sparkles-vLuTA_N5.js";
import { W as Wallet } from "./wallet-DROFAZNg.js";
import { T as TrendingUp } from "./trending-up-D_6YT2Qd.js";
import { S as ShieldAlert } from "./shield-alert-Dbnhv01i.js";
import { T as TrendingDown } from "./trending-down-BJbRYwDE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 6V2H8", key: "1155em" }],
  ["path", { d: "m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z", key: "w2lp3e" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M9 11v2", key: "1ueba0" }],
  ["path", { d: "M15 11v2", key: "i11awn" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }]
];
const BotMessageSquare = createLucideIcon("bot-message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
];
const ChartLine = createLucideIcon("chart-line", __iconNode);
const FEATURES = [
  {
    icon: TrendingUp,
    title: "Expense Tracking",
    description: "Log and categorize transactions in seconds. Automatic breakdowns give you instant clarity on where your money goes.",
    badge: "Core",
    badgeVariant: "secondary"
  },
  {
    icon: ShieldAlert,
    title: "Smart Anomaly Alerts",
    description: "Rule-based detection flags unusual spending the moment it happens — overspending, category spikes, and more.",
    badge: "Intelligent",
    badgeVariant: "destructive"
  },
  {
    icon: BotMessageSquare,
    title: "AI Financial Assistant",
    description: "Chat with your personal AI advisor for personalized insights, budgeting tips, and financial guidance.",
    badge: "AI-Powered",
    badgeVariant: "default"
  }
];
const STATS = [
  { label: "Avg. monthly savings", value: "₹1,03,000", icon: Wallet },
  { label: "Expense categories tracked", value: "12+", icon: ChartLine },
  { label: "Alerts generated/month", value: "3–8", icon: Bell },
  { label: "Insights per week", value: "5+", icon: Sparkles }
];
const TESTIMONIALS = [
  {
    quote: "Finora helped me cut dining expenses by 30% in one month.",
    name: "Sarah K.",
    role: "Freelance Designer"
  },
  {
    quote: "The anomaly detection caught a subscription I forgot about. Saved me instantly.",
    name: "Marcus T.",
    role: "Software Engineer"
  },
  {
    quote: "Finally a finance app that doesn't feel overwhelming. Clean and intelligent.",
    name: "Priya N.",
    role: "Product Manager"
  }
];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold tracking-tight text-foreground select-none", children: "Finora" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#features",
            className: "hover:text-foreground transition-colors",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#insights",
            className: "hover:text-foreground transition-colors",
            children: "Insights"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            "data-ocid": "landing.login_button",
            children: "Log in"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            "data-ocid": "landing.get_started_nav_button",
            children: [
              "Get Started ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-background pt-16 pb-0 px-4 md:px-8",
        "data-ocid": "landing.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.52 0.19 246 / 0.07), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center space-y-6 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "mb-4 text-xs px-3 py-1 rounded-full font-body",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1.5 text-primary" }),
                        "AI-powered personal finance"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[3.25rem] md:text-[4.5rem] lg:text-[5.25rem] font-semibold tracking-tight text-foreground leading-[1.03]", children: [
                    "Your Smart",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Financial" }),
                    " Companion"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.5,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1]
                },
                className: "text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed",
                children: "Track every rupee, detect unusual spending automatically, and get AI-powered guidance — in one beautifully simple dashboard."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.5,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                },
                className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gap-2 px-7 text-base shadow-card-hover",
                      "data-ocid": "landing.hero_cta",
                      children: [
                        "Get Started Free ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "lg",
                      className: "gap-2 text-base text-muted-foreground",
                      "data-ocid": "landing.hero_demo_button",
                      children: "View Dashboard"
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.38 },
                className: "flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5", children: [
                    { cls: "bg-primary/80", id: "a1" },
                    { cls: "bg-accent/80", id: "a2" },
                    { cls: "bg-primary/60", id: "a3" }
                  ].map(({ cls, id }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-6 w-6 rounded-full border-2 border-background ${cls}`
                    },
                    id
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Join 2,400+ people managing finances smarter" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
              className: "relative z-10 max-w-5xl mx-auto mt-12 px-0 md:px-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-t-2xl border border-border shadow-card-hover overflow-hidden",
                    style: {
                      boxShadow: "0 4px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 py-3 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-destructive/50" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-accent/50" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-primary/40" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 max-w-xs mx-auto rounded-full bg-muted/70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "finora.app/dashboard" }) }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: "/assets/generated/dashboard-preview.dim_1200x750.png",
                          alt: "Finora Dashboard Preview",
                          className: "w-full object-cover object-top",
                          style: { maxHeight: "440px" }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 h-24 pointer-events-none",
                    style: {
                      background: "linear-gradient(to bottom, transparent, oklch(var(--background)))"
                    }
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-y border-border py-10 px-4 md:px-8 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.35, delay: i * 0.08 },
        className: "text-center space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-primary mx-auto mb-2 opacity-70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-semibold text-foreground", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
        ]
      },
      s.label
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "features",
        className: "bg-muted/20 py-20 px-4 md:px-8",
        "data-ocid": "landing.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.45 },
              className: "text-center mb-14 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary uppercase tracking-widest", children: "Features" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground", children: "Everything you need to stay on track" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "Finora brings together the tools smart finance management requires — without the clutter." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.45, delay: i * 0.1 },
              className: "group bg-card rounded-2xl border border-border shadow-card p-7 space-y-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-smooth",
              "data-ocid": `landing.feature_card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center group-hover:bg-primary/12 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "h-5 w-5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: feature.badgeVariant,
                      className: "text-[10px] rounded-full",
                      children: feature.badge
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base", children: feature.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feature.description })
              ]
            },
            feature.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "insights",
        className: "bg-background py-20 px-4 md:px-8",
        "data-ocid": "landing.anomaly_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-14 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -24 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.55 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-destructive uppercase tracking-widest", children: "Anomaly Detection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground leading-snug", children: "Know the moment something feels off" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Our rule-based engine watches every transaction. If dining spikes 30%, if a single expense doubles your average, or if your daily spend exceeds your limit — you'll know immediately." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                  {
                    icon: TrendingUp,
                    text: "Expense 2× above average → flagged instantly"
                  },
                  {
                    icon: TrendingDown,
                    text: "Category spend up 30%+ → category alert"
                  },
                  {
                    icon: Bell,
                    text: "Daily limit exceeded → overspend warning"
                  }
                ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.li,
                  {
                    initial: { opacity: 0, x: -12 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.35, delay: i * 0.1 },
                    className: "flex items-start gap-3 text-sm text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-3 w-3 text-destructive" }) }),
                      item.text
                    ]
                  },
                  item.text
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "gap-2",
                    "data-ocid": "landing.anomaly_cta",
                    children: [
                      "See it in action ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.55, delay: 0.1 },
              className: "space-y-3",
              children: [
                {
                  level: "critical",
                  title: "Unusual high expense detected",
                  desc: "Dining expense of ₹15,350 is 2.4× your average (₹6,400)",
                  time: "Just now"
                },
                {
                  level: "warning",
                  title: "Food category spike",
                  desc: "Your food spending increased 38% this week vs. last week",
                  time: "2h ago"
                },
                {
                  level: "info",
                  title: "Daily spending limit reached",
                  desc: "You've exceeded your ₹16,600/day limit. Total today: ₹20,500",
                  time: "5h ago"
                }
              ].map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.12 },
                  className: "bg-card rounded-xl border border-border shadow-card p-4 flex gap-3 items-start",
                  "data-ocid": `landing.alert_preview.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${alert.level === "critical" ? "bg-destructive/10" : alert.level === "warning" ? "bg-accent/10" : "bg-primary/10"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Bell,
                          {
                            className: `h-4 w-4 ${alert.level === "critical" ? "text-destructive" : alert.level === "warning" ? "text-accent" : "text-primary"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: alert.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-shrink-0", children: alert.time })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: alert.desc })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: alert.level === "critical" ? "destructive" : alert.level === "warning" ? "secondary" : "default",
                        className: "text-[10px] rounded-full flex-shrink-0",
                        children: alert.level === "critical" ? "Critical" : alert.level === "warning" ? "Warning" : "Info"
                      }
                    )
                  ]
                },
                alert.title
              ))
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 py-20 px-4 md:px-8 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4 },
          className: "text-center mb-12 space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary uppercase tracking-widest", children: "Testimonials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold text-foreground", children: "Loved by people who take finances seriously" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          className: "bg-card rounded-2xl border border-border shadow-card p-6 space-y-4",
          "data-ocid": `landing.testimonial.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed", children: [
              "“",
              t.quote,
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 pt-1 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary", children: t.name[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: t.role })
              ] })
            ] })
          ]
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-24 px-4 md:px-8 border-t border-border text-center",
        "data-ocid": "landing.final_cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "max-w-xl mx-auto space-y-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground", children: "Start taking control of your finances today" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No setup required. Dive into your dashboard and start tracking in seconds." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gap-2 px-8 text-base shadow-card-hover",
                  "data-ocid": "landing.final_cta_button",
                  children: [
                    "Open Dashboard ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              ) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border py-8 px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold text-foreground", children: "Finora" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ".",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-foreground transition-colors",
            children: "Built with love using caffeine.ai"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#features",
            className: "hover:text-foreground transition-colors",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#insights",
            className: "hover:text-foreground transition-colors",
            children: "Insights"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/dashboard",
            className: "hover:text-foreground transition-colors",
            "data-ocid": "landing.footer_dashboard_link",
            children: "Dashboard"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Landing as default
};
