import { PageContainer, PageHeader, SectionCard } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCategoryBreakdown,
  useDailySpending,
} from "@/hooks/useDashboardStats";
import { BarChart2, PieChart as PieIcon, TrendingUp } from "lucide-react";
import { type ReactElement, useCallback, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

// ── Design-system chart palette (maps to CSS --chart-1..5) ──────────────────
const CHART_COLORS = [
  "oklch(0.52 0.19 246)",
  "oklch(0.72 0.22 41)",
  "oklch(0.58 0.25 27)",
  "oklch(0.52 0.15 140)",
  "oklch(0.68 0.18 180)",
  "oklch(0.60 0.12 270)",
];

const CHART_COLORS_LIGHT = [
  "oklch(0.88 0.08 246)",
  "oklch(0.92 0.09 41)",
  "oklch(0.90 0.10 27)",
  "oklch(0.88 0.06 140)",
  "oklch(0.90 0.07 180)",
  "oklch(0.90 0.05 270)",
];

function buildBarGradient(from: string, to: string): string {
  return `linear-gradient(90deg, ${from}, ${to})`;
}

// ── Formatters ───────────────────────────────────────────────────────────────
function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

// ── Custom Tooltip — Line Chart ──────────────────────────────────────────────
function LineTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-0.5">{label}</p>
      <p className="text-primary font-bold text-sm">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

// ── Custom Tooltip — Pie Chart ───────────────────────────────────────────────
function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { pct: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-0.5">{item.name}</p>
      <p className="text-primary font-bold text-sm">
        {formatCurrency(item.value)}
      </p>
      <p className="text-muted-foreground">{item.payload.pct.toFixed(1)}%</p>
    </div>
  );
}

// ── Active Shape for Donut ───────────────────────────────────────────────────
function ActiveDonutShape(props: unknown): ReactElement {
  const {
    cx = 0,
    cy = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle,
    endAngle,
    fill,
    payload,
    percent = 0,
    value = 0,
  } = props as PieSectorDataItem & {
    payload: { category: string };
    value: number;
  };

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={Number(innerRadius) - 4}
        outerRadius={Number(outerRadius) + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={1}
      />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="oklch(0.125 0.02 0)"
        style={{ fontSize: 13, fontWeight: 600 }}
      >
        {(payload as { category: string }).category}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="oklch(0.52 0.19 246)"
        style={{ fontSize: 14, fontWeight: 700 }}
      >
        {formatCurrency(value)}
      </text>
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fill="oklch(0.48 0.01 0)"
        style={{ fontSize: 11 }}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
}

// ── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({
  icon: Icon,
  message,
}: { icon: typeof TrendingUp; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────────────────────
function ChartSkeleton({ height = 260 }: { height?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-3 w-1/4 rounded" />
        <Skeleton className="h-3 w-1/6 rounded" />
      </div>
      <Skeleton className="w-full rounded-xl" style={{ height }} />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Charts() {
  const { data: dailySpending = [], isLoading: dailyLoading } =
    useDailySpending();
  const { data: categoryBreakdown = [], isLoading: categoryLoading } =
    useCategoryBreakdown();
  const [activeIndex, setActiveIndex] = useState(0);

  const grandTotal = categoryBreakdown.reduce((s, c) => s + c.total, 0);
  const pieData = categoryBreakdown.map((c) => ({
    ...c,
    pct: grandTotal > 0 ? (c.total / grandTotal) * 100 : 0,
  }));

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const maxDay = dailySpending.length
    ? dailySpending.reduce((a, b) => (a.total > b.total ? a : b))
    : null;
  const weeklyTotal = dailySpending.reduce((s, d) => s + d.total, 0);

  return (
    <PageContainer>
      <PageHeader
        title="Spending Charts"
        description="Visual breakdown of your spending patterns"
      />

      {/* Stat pills */}
      <div className="flex flex-wrap gap-2 mb-6" data-ocid="charts.stats_row">
        <Badge
          variant="secondary"
          className="text-xs gap-1.5 px-3 py-1.5 rounded-full"
        >
          <TrendingUp className="w-3 h-3" />
          Weekly total: {formatCurrency(weeklyTotal)}
        </Badge>
        {maxDay && (
          <Badge
            variant="outline"
            className="text-xs gap-1.5 px-3 py-1.5 rounded-full border-border"
          >
            <BarChart2 className="w-3 h-3" />
            Peak: {maxDay.dayLabel} ({formatCurrency(maxDay.total)})
          </Badge>
        )}
        {pieData[0] && (
          <Badge
            variant="outline"
            className="text-xs gap-1.5 px-3 py-1.5 rounded-full border-border"
          >
            <PieIcon className="w-3 h-3" />
            Top category: {pieData[0].category}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Line Chart */}
        <SectionCard
          className="lg:col-span-2 animate-fade-in"
          data-ocid="charts.weekly_spending_card"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-base">
                Weekly Spending
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Daily totals for the past 7 days
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>

          {dailyLoading ? (
            <ChartSkeleton height={260} />
          ) : dailySpending.length === 0 ? (
            <EmptyState
              icon={TrendingUp}
              message="No spending data yet. Add expenses to see your weekly chart."
            />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={dailySpending}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.52 0.19 246)"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.52 0.19 246)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="oklch(0.88 0.01 0 / 0.6)"
                  vertical={false}
                />
                <XAxis
                  dataKey="dayLabel"
                  tick={{ fontSize: 11, fill: "oklch(0.48 0.01 0)" }}
                  axisLine={false}
                  tickLine={false}
                  dy={6}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.48 0.01 0)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${v}`}
                  width={50}
                />
                <Tooltip content={<LineTooltip />} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="oklch(0.52 0.19 246)"
                  strokeWidth={2.5}
                  dot={{
                    fill: "oklch(1 0 0)",
                    stroke: "oklch(0.52 0.19 246)",
                    strokeWidth: 2.5,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "oklch(0.52 0.19 246)",
                    stroke: "oklch(1 0 0)",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* Category Donut Chart */}
        <SectionCard
          className="animate-fade-in"
          data-ocid="charts.category_pie_card"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-base">
                Category Breakdown
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Where your money goes
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <PieIcon className="w-4 h-4 text-accent" />
            </div>
          </div>

          {categoryLoading ? (
            <ChartSkeleton height={240} />
          ) : pieData.length === 0 ? (
            <EmptyState icon={PieIcon} message="No category data yet." />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={ActiveDonutShape}
                  data={pieData}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="46%"
                  outerRadius={92}
                  innerRadius={52}
                  onMouseEnter={onPieEnter}
                  strokeWidth={2}
                  stroke="oklch(0.985 0.005 0)"
                >
                  {pieData.map((item, index) => (
                    <Cell
                      key={item.category}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                      opacity={activeIndex === index ? 1 : 0.82}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
                  formatter={(value: string) => (
                    <span style={{ color: "oklch(0.48 0.01 0)" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* Category progress bars */}
        <SectionCard
          className="animate-fade-in"
          data-ocid="charts.category_table_card"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-base">
                Spending by Category
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Proportional breakdown
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {categoryLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-2/3 rounded" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : pieData.length === 0 ? (
            <EmptyState
              icon={BarChart2}
              message="Add expenses to see your category breakdown."
            />
          ) : (
            <div className="space-y-4">
              {pieData.map((item, i) => (
                <div
                  key={item.category}
                  className="space-y-1.5"
                  data-ocid={`charts.category_row.${i + 1}`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          background: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                      <span className="text-foreground truncate">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs text-muted-foreground">
                        {item.pct.toFixed(1)}%
                      </span>
                      <span className="font-semibold text-foreground text-xs tabular-nums">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.pct}%`,
                        background: buildBarGradient(
                          CHART_COLORS[i % CHART_COLORS.length],
                          CHART_COLORS_LIGHT[i % CHART_COLORS_LIGHT.length],
                        ),
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-border flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="font-bold text-foreground tabular-nums">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </PageContainer>
  );
}
