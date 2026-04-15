import { DashboardLayout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { RouterProvider } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/Landing"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const ExpensesPage = lazy(() => import("@/pages/Expenses"));
const ChartsPage = lazy(() => import("@/pages/Charts"));
const InsightsPage = lazy(() => import("@/pages/Insights"));
const AIAssistantPage = lazy(() => import("@/pages/AIAssistant"));
const BudgetPage = lazy(() => import("@/pages/Budget"));
const GoalsPage = lazy(() => import("@/pages/Goals"));

function PageFallback() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}

// Route tree
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LandingPage />
    </Suspense>
  ),
});

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <DashboardPage />
    </Suspense>
  ),
});

const expensesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/expenses",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ExpensesPage />
    </Suspense>
  ),
});

const chartsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/charts",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ChartsPage />
    </Suspense>
  ),
});

const insightsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/insights",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <InsightsPage />
    </Suspense>
  ),
});

const aiRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/ai",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AIAssistantPage />
    </Suspense>
  ),
});

const budgetRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/budget",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BudgetPage />
    </Suspense>
  ),
});

const goalsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/goals",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GoalsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    expensesRoute,
    chartsRoute,
    insightsRoute,
    aiRoute,
    budgetRoute,
    goalsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
