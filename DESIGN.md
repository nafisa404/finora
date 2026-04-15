# Design Brief — Finora

**Purpose**: Premium fintech personal finance assistant. Users need clarity, confidence, and control in financial decision-making.

**Tone**: Refined minimalism, professional trustworthiness. Not generic SaaS. Inspired by Stripe, Linear aesthetic.

**Primary Differentiation**: Precise spacing, soft depth hierarchy, intelligent color restraint. Blue reserved for positive/actionable states. Anomaly detection alerts use strategic color coding (amber for warnings, muted red for critical).

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| **Primary** | 0.52 0.19 246 | 0.62 0.22 246 | CTAs, highlights, active states — soft blue |
| **Accent** | 0.72 0.22 41 | 0.72 0.22 41 | Anomaly alerts, warnings — warm amber |
| **Destructive** | 0.58 0.25 27 | 0.65 0.25 27 | Critical alerts, destructive actions — muted red |
| **Success** | Chart-1 | Chart-1 | Positive trends, savings growth |
| **Background** | 0.985 0.005 0 | 0.12 0.01 0 | Pristine off-white / deep charcoal |
| **Card** | 1.0 0.002 0 | 0.165 0.008 0 | Container backgrounds, lifted surfaces |
| **Border** | 0.88 0.01 0 | 0.25 0.008 0 | Subtle dividers, input borders |
| **Foreground** | 0.125 0.02 0 | 0.92 0.01 0 | Primary text, maximum contrast |
| **Muted** | 0.92 0.01 0 | 0.21 0.01 0 | Secondary text, disabled states |

## Typography

| Role | Font | Usage |
|------|------|-------|
| **Display** | Fraunces (serif) | Page headings, hero text, premium feel |
| **Body** | GeneralSans (sans-serif) | Body copy, UI labels, high readability |
| **Mono** | GeistMono | Data values, transaction amounts, code snippets |

**Scale**: 12px (caption), 14px (body), 16px (body-lg), 20px (heading-sm), 28px (heading-md), 36px (heading-lg)

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| **Header/Nav** | bg-card with border-b-border, subtle-shadow. Primary text. | Consistent navigation, clear hierarchy |
| **Dashboard Cards** | bg-card with shadow-card (0 2px 8px), 0.625rem radius, gap-4 grid | Elevation, contained information blocks |
| **Card Hover** | shadow-card-hover (0 4px 12px), translate-y-[-1px] transition-smooth | Micro-interaction feedback |
| **Alert Badges** | Inline badges: Primary (blue bg), Accent (amber bg), Destructive (red bg) | Visual scanning, rule-based anomaly detection |
| **Form Inputs** | bg-input border-border focus:ring-ring, 0.625rem radius | Consistency, clear interaction zones |
| **Content Grid** | Alternating bg-muted/40 for every other row/section | Rhythm, visual breathing |
| **Footer** | bg-muted/30 with border-t-border, reduced text size | Deemphasis, reference information |

## Component Patterns & Motion

- **Buttons**: Primary (bg-primary text-primary-foreground), Secondary (bg-secondary), Outline (border-border). All use transition-smooth hover state (scale 1.02, shadow lift).
- **Cards**: bg-card shadow-card, rounded-lg (0.625rem). Hover: shadow-card-hover + translate-y. Click: animate-fade-in.
- **Alerts**: Inline badge system. Info (blue), Warning (amber), Critical (red). Pulsing outline on critical (animate-pulse-soft).
- **Inputs**: bg-input border-border, focus-ring-2 ring-ring, transition-smooth. Readonly state: bg-muted cursor-not-allowed.
- **Icons**: Lucide-react 24px default, gray color matched to text-muted, accent color on hover (text-primary).
- **Loading**: animate-pulse-soft on skeleton loaders, smooth fade-in on content appearance.
- **Transactions**: Row hover lifts card slightly (shadow-card-hover), slide-up animation on first render.

## Animation Choreography

| Animation | Timing | Use |
|-----------|--------|-----|
| **fade-in** | 0.3s ease-out | Content reveal, overlay appearance |
| **slide-up** | 0.3s ease-out | Cards on initial render, alerts appearing |
| **transition-smooth** | 0.3s cubic-bezier(0.4,0,0.2,1) | All hover states, interactive feedback |
| **pulse-soft** | 2s ease-in-out infinite | Loading states, soft visual breathing |

**Constraints**: No bounce animations. No gradient animations. No auto-animate on scroll. All motion has purpose: feedback, state change, or attention.

## Responsive Design

- **Mobile-first**: sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- **Grid**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Typography**: Reduced on mobile (20px hero), scale up on tablet/desktop
- **Spacing**: Condensed (2rem padding) on mobile, expanded (3rem) on desktop
- **Sidebar**: Hidden on mobile (drawer/collapse), visible on tablet+

## Constraints & Anti-Patterns

- ❌ No generic SaaS blue (#3B82F6). Use OKLCH palette exclusively.
- ❌ No full-page gradients or decorative blur effects.
- ❌ No rainbow color palettes. Max 5 core colors + neutrals.
- ❌ No overshadows on cards. Subtle depth only (shadow-card standard).
- ❌ No bouncy or playful animations. Smooth, professional motion.
- ❌ No arbitrary Tailwind colors. All tokens via CSS variables.
- ✅ Anomaly detection alerts use red/amber badges for instant visual scanning.
- ✅ All interactive elements respond to hover/focus with transition-smooth.
- ✅ Chart colors use palette harmony (blue, amber, red, accent tints).

## Signature Detail

**Anomaly alert system**: Rule-based detection displayed as inline badges on dashboard. Blue badge (info), amber badge + icon (30%+ category spike), red badge + pulsing outline (critical overspend). Each alert includes: rule name, amount, recommended action. Integrated into dashboard card layout without breaking flow. This is the app's intelligent heart — design emphasizes it without overdesign.
